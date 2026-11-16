/* OpenNext worker-inin üstünə /api/* çatı və bulud sinxronizasiyası əlavə edilir.
 * Qeyd: *.workers.dev domenlərində bir worker başqa workerə fetch edə bilmir,
 * ona görə API bu workerin öz DO-larında işləyir. */
import opennext from "./.open-next/worker.js";
import { handleApi, Room, Sync } from "./cloudflare/api.js";
export { Room, Sync };

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      if (!env.ROOM || !env.SYNC) return new Response(JSON.stringify({ err: "api konfiqurasiya edilməyib" }), { status: 500, headers: { "content-type": "application/json" } });
      return handleApi(request, env);
    }
    return opennext.fetch(request, env, ctx);
  },
};
