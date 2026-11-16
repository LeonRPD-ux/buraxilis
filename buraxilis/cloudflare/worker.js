/* Buraxılışa hazırlıq — Canlı çat backend (Cloudflare Workers + Durable Objects) */
const HDR = { 'content-type': 'application/json', 'cache-control': 'no-store' };
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: HDR });

/* Android TWA (APK) → veb-sayt əlaqəsi; SHA256 barmaq izi bubblewrap build-dən sonra yazılır */
const ASSETLINKS = [{
  relation: ['delegate_permission/common.handle_all_urls'],
  target: {
    namespace: 'android_app',
    package_name: 'az.buraxilis.app',
    sha256_cert_fingerprints: ['BA:AF:BB:F6:62:5B:C6:0B:B5:E6:72:51:30:0D:85:46:27:72:56:DB:85:A6:48:53:08:61:A9:5E:ED:5C:E0:B3']
  }
}];

/* V28.7: sinxronizasiya üçün Sync DO — kodla tapılan istifadəçinin gedişat nüsxəsi */
export class Sync {
  constructor(state, env) { this.state = state; }
  async fetch(req) {
    try {
      const a = new URL(req.url).pathname.slice(1);
      if (a === 'push') {
        const b = await req.json();
        const d = typeof b.d === 'string' ? b.d : JSON.stringify(b.d || {});
        if (d.length > 4000000) return json({ err: 'həddən artıq böyük' }, 413);
        const t = Date.now(), n = String(b.n || '').slice(0, 24);
        await this.state.storage.put('d', d);
        await this.state.storage.put('t', t);
        await this.state.storage.put('n', n);
        return json({ ok: 1, t });
      }
      if (a === 'pull') {
        const d = await this.state.storage.get('d');
        if (!d) return json({ err: 'empty' }, 404);
        const t = (await this.state.storage.get('t')) || 0;
        return json({ d, t, n: (await this.state.storage.get('n')) || '' });
      }
      return json({ err: 'unknown' }, 404);
    } catch (e) {
      return json({ err: 'sync-xəta: ' + (e && e.message || String(e)) }, 500);
    }
  }
}

/* Hər otaq üçün bir Room DO: üzvlər + mesajlar saxlanılır */
export class Room {
  constructor(state, env) { this.state = state; }
  async load() {
    if (this._r) return;
    this.members = (await this.state.storage.get('m')) || {};
    this.msgs = (await this.state.storage.get('g')) || [];
    this.n = (await this.state.storage.get('n')) || 0;
    this._r = 1;
  }
  async save() {
    await this.state.storage.put('m', this.members);
    await this.state.storage.put('g', this.msgs);
    await this.state.storage.put('n', this.n);
  }
  async fetch(req) {
    await this.load();
    const u = new URL(req.url), a = u.pathname.slice(1);
    if (a === 'join') {
      const b = await req.json();
      const id = b.id || crypto.randomUUID();
      this.members[id] = { n: String(b.n || 'Qonaq').slice(0, 24), s: isFinite(+b.s) ? +b.s : null, t: Date.now() };
      // 30 gündən köhnə üzvləri təmizlə
      for (const [k, v] of Object.entries(this.members)) if (Date.now() - (v.t || 0) > 30 * 864e5) delete this.members[k];
      await this.save();
      return json({ id });
    }
    if (a === 'msg') {
      const b = await req.json();
      const mem = this.members[b.id];
      if (!mem) return json({ err: 'əvvəlcə qoşul' }, 400);
      const t = String(b.t || '').slice(0, 500).trim();
      if (!t) return json({ err: 'boş' }, 400);
      const m = { i: ++this.n, uid: b.id, u: mem.n, t, d: Date.now() };
      this.msgs.push(m);
      if (this.msgs.length > 200) this.msgs = this.msgs.slice(-200);
      await this.save();
      return json({ ok: 1, i: m.i });
    }
    if (a === 'state') {
      const since = +u.searchParams.get('since') || 0;
      return json({
        msgs: this.msgs.filter(m => m.i > since),
        members: this.members,
        last: this.n
      });
    }
    return json({ err: 'unknown' }, 404);
  }
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname.startsWith('/api/room/')) {
      const rest = url.pathname.slice('/api/room/'.length);
      const [code, action = 'state'] = rest.split('/');
      if (!/^[A-Za-z0-9-]{4,12}$/.test(code)) return json({ err: 'kod düzgün deyil' }, 400);
      if (!['join', 'msg', 'state'].includes(action)) return json({ err: 'əməliyyat yoxdur' }, 400);
      const id = env.ROOM.idFromName(code.toLowerCase());
      const stub = env.ROOM.get(id);
      return stub.fetch('https://do/' + action, {
        method: req.method,
        body: req.method === 'POST' ? req.body : undefined,
        headers: { 'content-type': 'application/json' }
      });
    }
    /* V28.7: bulud sinxronizasiya — push/pull gedişat nüsxəsi (kod 6-10 simvol) */
    if (url.pathname.startsWith('/api/sync/')) {
      const rest = url.pathname.slice('/api/sync/'.length);
      const [code, action = 'pull'] = rest.split('/');
      if (!/^[A-Za-z0-9]{6,10}$/.test(code)) return json({ err: 'kod düzgün deyil' }, 400);
      if (!['push', 'pull'].includes(action)) return json({ err: 'əməliyyat yoxdur' }, 400);
      const stub = env.SYNC.get(env.SYNC.idFromName(code.toLowerCase()));
      return stub.fetch('https://do/' + action, {
        method: req.method,
        body: req.method === 'POST' ? req.body : undefined,
        headers: { 'content-type': 'application/json' }
      });
    }
    if (url.pathname === '/.well-known/assetlinks.json') return json(ASSETLINKS);
    /* APK/AAB: brauzer birbaşa yükləsin, "səhifə" kimi açmasın */
    if (url.pathname.endsWith('.apk') || url.pathname.endsWith('.aab')) {
      const resp = await env.ASSETS.fetch(req);
      const h = new Headers(resp.headers);
      h.set('content-disposition', 'attachment; filename="Buraxilis.apk"');
      return new Response(resp.body, { status: resp.status, headers: h });
    }
    if (url.pathname.startsWith('/api/')) return json({ err: 'not found' }, 404);
    return env.ASSETS.fetch(req);
  }
};
