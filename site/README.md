# Buraxılışa hazırlıq — reklam saytı

Next.js (App Router) ilə hazırlanmış ikidilli (AZ/EN) minimalist landing page.
Tətbiqin özü `public/app/` qovluğundadır və saytdan birbaşa açılır.

## Başlatma

```bash
npm install
npm run dev      # http://localhost:3000 → /az səhifəsinə yönləndirir
npm run build    # production build
npm start        # production server
```

## Struktur

```
app/
  [locale]/layout.tsx   # <html lang>, metadata, viewport
  [locale]/page.tsx     # səhifənin bölmələri
  globals.css           # bütün dizayn (token-lər, bölmələr, dark mode)
  opengraph-image.tsx   # sosial şəbəkə şəkli (avtomatik generasiya)
  robots.ts, sitemap.ts
components/             # Header, Footer, bölmələr, telefon mockup-ları
content/
  site.ts               # brend adı, keçidlər, e-poçt — BURADAN DƏYİŞİN
  dictionaries.ts       # bütün mətnlər (AZ + EN) — BURADAN REDAKTƏ EDİN
public/app/             # tətbiqin özü (index.html, sw.js, version.json)
middleware.ts           # "/" → dilinə uyğun səhifəyə yönləndirmə
```

## Nəyi harada dəyişmək lazımdır

| Nə | Fayl |
| --- | --- |
| Brend adı, e-poçt, Telegram, tətbiq linki | `content/site.ts` |
| Bütün başlıqlar, mətnlər, qiymətlər, FAQ, rəylər | `content/dictionaries.ts` |
| Rənglər, ölçülər, dark mode | `app/globals.css` (`:root` dəyişənləri) |
| Domen (metadata, sitemap) | `app/[locale]/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` |

### Qiymət planları

`content/dictionaries.ts` → `pricing.plans`. Hazırkı rəqəmlər nümunədir.
Planı gizlətmək üçün massivdən silin (grid avtomatik uyğunlaşır).

### Rəylər

`content/dictionaries.ts` → `testimonials.items`. Real rəylərlə əvəz edin.

### Ekran görüntüləri

Hazırda telefon mockup-ları `components/PhoneMock.tsx` içində CSS ilə çəkilib.
Real şəkillərlə əvəz etmək üçün `public/screens/*.png` əlavə edib
`components/Sections.tsx` → `Screens` bölməsində `<PhoneX />` yerinə
`<img src="/screens/result.png" alt="..." />` yazın.

## Qeydlər

- Dil dəyişdirici `/az` və `/en` ünvanlarına keçid edir; hər ikisi statik generasiya olunur.
- `prefers-color-scheme` ilə avtomatik tünd rejim dəstəklənir.
- Bütün animasiyalar `prefers-reduced-motion` ilə söndürülür.
- Sayt JS olmadan da oxunur (`<noscript>` fallback).
