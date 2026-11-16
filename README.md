# 🎓 Buraxılışa hazırlıq

Azərbaycan 9-cu sinif buraxılış imtahanına hazırlıq üçün PWA tətbiq və reklam saytı.

| | Ünvan | Texnologiya |
|---|---|---|
| 📱 Tətbiq | https://buraxilis.kennedyleonscott220.workers.dev | Vanilla JS PWA + Cloudflare Workers |
| 🌐 Reklam saytı | https://buraxilis-site.kennedyleonscott220.workers.dev | Next.js + OpenNext Cloudflare |

## Əsas funksiyalar

- Buraxılış və blok (I–IV qrup) imtahan modları, OMR cavab işarələmə
- Canlı çat (otaq kodu ilə) — Cloudflare Durable Objects
- ☁️ Bulud sinxronizasiya — gedişatı kodla başqa cihaza köçür
- Zəif mövzular, səhvlərin təhlili, fasiləli təkrar, nailiyyətlər, XP/streak
- Offline işləyir (service worker + keş), APK versiya var

## Struktur

```
buraxilis/          # PWA tətbiq (index.html, sw.js, worker, Android TWA)
  cloudflare/       # Workers + Durable Objects backend (çat, sinxronizasiya)
  github/           # APK yükləmə səhifəsi (GitHub Pages)
site/               # Next.js reklam saytı (OpenNext adapter ilə Cloudflare-də)
.github/workflows/  # CI/CD: avtomatik deploy + Pages
```

## Deploy

GitHub Actions avtomatik deploy edir (`main` branch-ə push edəndə):
- `buraxilis/**` dəyişəndə → tətbiq worker-i
- `site/**` dəyişəndə → reklam saytı
- `github/**` dəyişəndə → APK yükləmə səhifəsi (Pages)

Secret-lər lazımdır: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

### Yerli deploy

```bash
cd buraxilis && npx wrangler deploy     # tətbiq
cd site && npm run cf:deploy            # sayt
```

## Versiya

`tətbiq: V28.7` — dəyişiklikdən sonra `index.html` (APP_VER), `sw.js`, `version.json` versiyalarını birlikdə artır.
