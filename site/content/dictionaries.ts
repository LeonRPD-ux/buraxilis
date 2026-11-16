/**
 * Saytın bütün mətnləri. Yeni dil əlavə etmək üçün `az` obyektini kopyalayıb
 * tərcümə edin və `dictionaries`-ə əlavə edin.
 */

export const locales = ["az", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "az";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const az = {
  meta: {
    title: "Buraxılışa hazırlıq — imtahana cibində hazırlaş",
    description:
      "10 fənn üzrə sual bankı, real imtahan simulyasiyası, DİM 2026 bal düsturu və offline rejim. Buraxılış və blok imtahanına hazırlıq üçün mobil tətbiq.",
  },
  langName: "AZ",
  langSwitchTo: "EN",
  nav: {
    features: "Xüsusiyyətlər",
    screens: "Ekran görüntüləri",
    how: "Necə işləyir",
    pricing: "Qiymət",
    faq: "Suallar",
  },
  actions: {
    open: "Tətbiqi aç",
    how: "Necə işləyir",
    install: "Ana ekrana əlavə et",
    contact: "Əlaqə saxla",
    allFeatures: "Bütün imkanlar",
  },
  hero: {
    badge: "Versiya 28.5 · DİM 2026 düsturları",
    title: "Buraxılış imtahanına hazırlıq, cibində.",
    subtitle:
      "10 fənn üzrə sual bankı, real imtahan simulyasiyası, avtomatik bal hesablaması və zəif mövzular üzrə ağıllı təkrar. İnternet olmadan da işləyir.",
    primary: "Tətbiqi aç",
    secondary: "Necə işləyir",
    note: "Qeydiyyat yoxdur · Pulsuz başla · Tam offline",
  },
  stats: [
    { value: "10", label: "fənn üzrə sual bankı" },
    { value: "700", label: "maksimum bal: 300 + 400" },
    { value: "3 saat", label: "real imtahan vaxtı" },
    { value: "100%", label: "offline işləyir" },
  ],
  features: {
    label: "İmkanlar",
    title: "Hazırlıq üçün lazım olan hər şey bir yerdə",
    desc: "Sadəcə sual bankı deyil — imtahanın özünü simulyasiya edən, nəticəni DİM qaydaları ilə hesablayan və zəif tərəflərini göstərən sistem.",
    items: [
      {
        icon: "exam",
        title: "Real imtahan simulyasiyası",
        desc: "11-ci sinif buraxılışı: Azərbaycan dili 30, Riyaziyyat 25, Xarici dil 30 sual. Taymer, OMR cavab vərəqi və səhvin balı azaltmadığı real qaydalar.",
      },
      {
        icon: "block",
        title: "Blok imtahanı",
        desc: "I (RK), I (RI), II, III (DT) və III (TC) qrupları. Hər fənn üzrə 22 qapalı, 5 kodlaşdırılan və 3 yazılı sual — 1,5 / 1,5 / 1 əmsalları ilə.",
      },
      {
        icon: "formula",
        title: "DİM 2026 bal düsturu",
        desc: "Nəticə avtomatik hesablanır: buraxılış 300 + blok 400 = 700. Keçid balını yaz, şərtlərə uyğunluğunu dərhal gör.",
      },
      {
        icon: "brain",
        title: "Ağıllı təkrar",
        desc: "Səhv etdiyin suallar yadda saxlanılır, zəif mövzular üzrə mini-testlər qurulur. Gündəlik hədəf və ardıcıl günlər motivasiyanı saxlayır.",
      },
      {
        icon: "chart",
        title: "Statistika və inkişaf",
        desc: "Hər cəhdin tarixçəsi, fənn üzrə bölgü və inkişaf qrafiki. Harada güclü, harada zəif olduğunu rəqəmlərlə görürsən.",
      },
      {
        icon: "offline",
        title: "Offline və sürətli",
        desc: "Bütün suallar cihazda saxlanılır. Metroda, yolda, internetsiz — gecikmə olmadan açılır, yeni versiya arxa planda yüklənir.",
      },
    ],
  },
  screens: {
    label: "Ekran görüntüləri",
    title: "Tətbiqin içi",
    desc: "Sadə, diqqəti yayındırmayan interfeys: bir ekranda bir sual, aydın nəticə və konkret növbəti addım.",
    captions: [
      "Nəticə ekranı — bal, fənn bölgüsü və növbəti addım",
      "Ağıllı hazırlıq — XP, ardıcıl günlər və zəif mövzular",
      "İmtahan rejimi — taymer, OMR cavab vərəqi, bir sual",
    ],
  },
  how: {
    label: "Necə işləyir",
    title: "Üç addımda başla",
    desc: "Qeydiyyat, kart məlumatı və ya quraşdırma tələb olunmur. Tətbiq brauzerdə açılır və ana ekrana əlavə olunur.",
    steps: [
      {
        n: "01",
        title: "Tətbiqi aç",
        desc: "Linkə toxun — sayt açılmır, tətbiq açılır. İlk yükləmədən sonra bütün suallar cihazda qalır.",
      },
      {
        n: "02",
        title: "İmtahanı seç",
        desc: "Buraxılış (9 və ya 11-ci sinif) və ya blok imtahanı. Fənn, mövzu və sual sayını özün müəyyən et.",
      },
      {
        n: "03",
        title: "Nəticəni gör",
        desc: "Bal DİM qaydaları ilə hesablanır. Səhvlər yadda qalır, zəif mövzular üzrə təkrar planı avtomatik qurulur.",
      },
    ],
  },
  testimonials: {
    label: "Rəylər",
    title: "İstifadəçilər nə deyir",
    desc: "Nəticələrini burada paylaşan şagirdlərdən bir neçə rəy.",
    items: [
      {
        quote:
          "Səhvlərimi ayrıca toplayıb təkrar etmək ən çox kömək edən hissə oldu. Blokda fizika nəticəm 20 bal artdı.",
        name: "Kamran Ə.",
        role: "11-ci sinif, Bakı",
      },
      {
        quote:
          "Metroda internet olmadan məşq edirdim — heç bir gecikmə yox idi. Taymer real imtahandakı kimi idi, ona görə həyəcan azaldı.",
        name: "Leyla M.",
        role: "11-ci sinif, Sumqayıt",
      },
      {
        quote:
          "Bal düsturunu özüm hesablamırdım. Nəticəni yazırdım, tətbiq keçid balı ilə müqayisə edirdi. Hansı fənnə fokuslanmalı olduğumu dərhal gördüm.",
        name: "Aysel R.",
        role: "9-cu sinif, Gəncə",
      },
    ],
  },
  pricing: {
    label: "Qiymət",
    title: "Sadə və şəffaf",
    desc: "Bütün sual bankı və imtahan rejimi pulsuzdur. Premium yalnız əlavə rahatlıq üçündür.",
    plans: [
      {
        name: "Pulsuz",
        price: "0",
        currency: "₼",
        period: "həmişəlik",
        desc: "Başlamaq üçün kifayət edən hər şey.",
        features: [
          "Bütün 10 fənn üzrə sual bankı",
          "Gündəlik 30 sual məşqi",
          "Buraxılış imtahanı simulyasiyası",
          "Bal hesablaması və nəticə ekranı",
          "Offline rejim",
        ],
        cta: "Pulsuz başla",
        featured: false,
        badge: "",
      },
      {
        name: "Premium",
        price: "4,99",
        currency: "₼",
        period: "aylıq",
        desc: "İmtahana qalan son aylar üçün.",
        features: [
          "Limitsiz sual və məşq",
          "Bütün blok imtahanı qrupları",
          "Ağıllı təkrar planı və zəif mövzu analizi",
          "Ətraflı statistika və inkişaf qrafiki",
          "Reklamsız tətbiq",
        ],
        cta: "Premium əldə et",
        featured: true,
        badge: "Ən çox seçilən",
      },
      {
        name: "İllik",
        price: "39,99",
        currency: "₼",
        period: "illik",
        desc: "Bir il ərzində iki ay pulsuz.",
        features: [
          "Premium-un bütün imkanları",
          "İllik yaddaş və nəticə arxivi",
          "Yeni fənn və suallara erkən çıxış",
          "Dostlarla nəticə müqayisəsi",
        ],
        cta: "İllik planı seç",
        featured: false,
        badge: "2 ay pulsuz",
      },
    ],
    note: "Qiymətlər nümunədir — öz tariflərinizlə əvəz edin.",
  },
  faq: {
    label: "Suallar",
    title: "Tez-tez verilən suallar",
    desc: "Ən çox soruşulanlar. Cavabını tapmadınız? Yazın.",
    items: [
      {
        q: "Tətbiq pulsuzdur?",
        a: "Bəli. Sual bankı, imtahan simulyasiyası və bal hesablaması pulsuzdur. Premium yalnız limitsiz məşq, ağıllı təkrar planı və ətraflı statistika üçün əlavə seçimdir.",
      },
      {
        q: "İnternet olmadan işləyirmi?",
        a: "Bəli. Bütün suallar ilk açılışdan sonra cihazda saxlanılır — tətbiq tam offline işləyir. İnternet qayıdanda yeni versiya arxa planda yüklənir.",
      },
      {
        q: "Necə quraşdırım?",
        a: "Tətbiqi brauzerdə açın, sonra menyudan «Ana ekrana əlavə et» seçin. iPhone-da Safari-də Paylaş → «Ana ekrana əlavə et». Bundan sonra tətbiq adi proqram kimi açılır.",
      },
      {
        q: "Bal düsturu DİM 2026 ilə uyğundurmu?",
        a: "Bəli. Buraxılış imtahanı üçün maksimum 300, blok imtahanı üçün 400 bal — cəmi 700. Blokda qapalı suallar 1,5, kodlaşdırılan 1,5, yazılı suallar 1 əmsalla hesablanır, 4 səhv cavab 1 düz cavabı silir.",
      },
      {
        q: "Məlumatlarım harada saxlanılır?",
        a: "Nəticələr və parametrlər yalnız sizin cihazınızda saxlanılır. Hesab yaratmaq lazım deyil, məlumatlar serverə göndərilmir.",
      },
      {
        q: "Telefonumda yer azdır, problem olar?",
        a: "Xeyr. Tətbiq adi sayt kimi yüklənir və keşlə işləyir, quraşdırma paketi tələb etmir. Yer azad etmək üçün keşi silmək kifayətdir.",
      },
      {
        q: "Yeni fənn və suallar əlavə olunur?",
        a: "Bəli, sual bankı mütəmadi genişlənir. Yeni versiya çıxanda tətbiq bunu bildirişlə xəbər verir və yenilənməni bir toxunuşla edir.",
      },
    ],
  },
  cta: {
    title: "Bu gün birinci sualla başla.",
    desc: "Qeydiyyat yoxdur, ödəniş tələb olunmur. Aç, fənn seç və imtahana hazırlığına davam et.",
    primary: "Tətbiqi aç",
    secondary: "Sual yaz",
    note: "Android, iOS və masaüstü brauzerlərdə işləyir",
  },
  footer: {
    tagline:
      "Buraxılış və blok imtahanına hazırlıq üçün müstəqil mobil tətbiq. DİM ilə rəsmi əlaqəsi yoxdur.",
    columns: [
      {
        title: "Tətbiq",
        links: [
          { label: "Xüsusiyyətlər", href: "#features" },
          { label: "Ekran görüntüləri", href: "#screens" },
          { label: "Qiymət", href: "#pricing" },
          { label: "Suallar", href: "#faq" },
        ],
      },
      {
        title: "Dəstək",
        links: [
          { label: "E-poçt", href: "mailto:salam@buraxilis.az" },
          { label: "Telegram", href: "https://t.me/buraxilis" },
          { label: "Instagram", href: "https://instagram.com/buraxilis" },
        ],
      },
    ],
    rights: "Bütün hüquqlar qorunur.",
  },
  mock: {
    exam: {
      app: "Blok imtahanı",
      timer: "2:48:12",
      counter: "12",
      total: "/ 30",
      question: "10 m/s sürətlə hərəkət edən cisim 5 saniyədə neçə metr yol gedir?",
      options: ["15 m", "50 m", "5 m", "500 m"],
      selected: 1,
      prev: "Əvvəlki",
      next: "Sonrakı",
    },
    result: {
      app: "Nəticə",
      value: "612",
      max: "/ 700",
      caption: "Buraxılış 258 · Blok 354",
      subjects: [
        { name: "Azərbaycan dili", value: 86 },
        { name: "Riyaziyyat", value: 74 },
        { name: "Xarici dil", value: 92 },
      ],
      cta: "Şərtlərə uyğunluğu yoxla",
    },
    smart: {
      app: "Ağıllı hazırlıq",
      xpLabel: "XP",
      xp: "1 240",
      streakLabel: "Ardıcıl gün",
      streak: "12",
      planTitle: "Bugünkü plan",
      planValue: "18 / 30 sual",
      planPct: 60,
      weakTitle: "Zəif mövzular",
      weak: [
        { name: "Kimya · Mol", pct: 38 },
        { name: "Tarix · XIX əsr", pct: 52 },
        { name: "Fizika · Elektrik", pct: 64 },
      ],
    },
  },
};

const en: typeof az = {
  meta: {
    title: "Buraxılış Prep — exam practice in your pocket",
    description:
      "A question bank across 10 subjects, real exam simulation, the official 2026 scoring formula and full offline mode. A mobile app for graduation and block exam preparation.",
  },
  langName: "EN",
  langSwitchTo: "AZ",
  nav: {
    features: "Features",
    screens: "Screens",
    how: "How it works",
    pricing: "Pricing",
    faq: "FAQ",
  },
  actions: {
    open: "Open the app",
    how: "How it works",
    install: "Add to home screen",
    contact: "Get in touch",
    allFeatures: "All features",
  },
  hero: {
    badge: "Version 28.5 · 2026 scoring rules",
    title: "Exam preparation, in your pocket.",
    subtitle:
      "A question bank across 10 subjects, realistic exam simulation, automatic scoring and smart review of your weak topics. Works without an internet connection.",
    primary: "Open the app",
    secondary: "How it works",
    note: "No sign-up · Start free · Fully offline",
  },
  stats: [
    { value: "10", label: "subjects in the bank" },
    { value: "700", label: "max score: 300 + 400" },
    { value: "3 hrs", label: "real exam duration" },
    { value: "100%", label: "works offline" },
  ],
  features: {
    label: "Features",
    title: "Everything you need to prepare",
    desc: "Not just a question bank — a system that simulates the exam itself, scores it by the official rules and shows you exactly what to fix.",
    items: [
      {
        icon: "exam",
        title: "Real exam simulation",
        desc: "Grade 11 graduation exam: 30 Azerbaijani language, 25 maths and 30 foreign language questions. Timer, OMR answer sheet and the real rule that wrong answers cost nothing.",
      },
      {
        icon: "block",
        title: "Block exam",
        desc: "Groups I (RK), I (RI), II, III (DT) and III (TC). Each subject has 22 multiple choice, 5 coded and 3 written questions with 1.5 / 1.5 / 1 weights.",
      },
      {
        icon: "formula",
        title: "2026 scoring formula",
        desc: "Scores are calculated automatically: 300 for graduation + 400 for the block, out of 700. Enter your target score and see instantly whether you qualify.",
      },
      {
        icon: "brain",
        title: "Smart review",
        desc: "Wrong answers are stored, mini-tests are built around your weak topics, and a daily goal plus streaks keep the habit alive.",
      },
      {
        icon: "chart",
        title: "Progress analytics",
        desc: "History of every attempt, per-subject breakdown and a progress chart. See where you are strong and where you are not.",
      },
      {
        icon: "offline",
        title: "Offline and fast",
        desc: "Every question is stored on your device. On the metro, on the road, with no connection — it opens instantly and updates in the background.",
      },
    ],
  },
  screens: {
    label: "Screens",
    title: "Inside the app",
    desc: "A calm interface with no distractions: one question per screen, a clear result and a concrete next step.",
    captions: [
      "Results — score, subject breakdown and the next step",
      "Smart prep — XP, streaks and weak topics",
      "Exam mode — timer, OMR sheet, one question at a time",
    ],
  },
  how: {
    label: "How it works",
    title: "Start in three steps",
    desc: "No sign-up, no card details, no installation. The app opens in your browser and lives on your home screen.",
    steps: [
      {
        n: "01",
        title: "Open the app",
        desc: "Tap the link — you get the app, not a website. After the first load every question is stored on the device.",
      },
      {
        n: "02",
        title: "Pick an exam",
        desc: "Graduation exam (grade 9 or 11) or block exam. Choose the subject, the topic and how many questions you want.",
      },
      {
        n: "03",
        title: "See your score",
        desc: "The score follows the official rules. Mistakes are remembered and a review plan is built around your weak topics.",
      },
    ],
  },
  testimonials: {
    label: "Testimonials",
    title: "What students say",
    desc: "A few words from students who shared their results.",
    items: [
      {
        quote:
          "Collecting my mistakes in one place and redoing them was the part that helped most. My physics score in the block exam went up by 20 points.",
        name: "Kamran A.",
        role: "Grade 11, Baku",
      },
      {
        quote:
          "I practised on the metro without any internet — zero lag. The timer felt exactly like the real exam, so my nerves were much calmer.",
        name: "Leyla M.",
        role: "Grade 11, Sumgait",
      },
      {
        quote:
          "I never calculated my score by hand. I typed the result in and the app compared it with the entry score. I immediately saw which subject to focus on.",
        name: "Aysel R.",
        role: "Grade 9, Ganja",
      },
    ],
  },
  pricing: {
    label: "Pricing",
    title: "Simple and transparent",
    desc: "The whole question bank and the exam mode are free. Premium only adds convenience.",
    plans: [
      {
        name: "Free",
        price: "0",
        currency: "₼",
        period: "forever",
        desc: "Everything you need to get started.",
        features: [
          "Question bank across all 10 subjects",
          "30 practice questions a day",
          "Graduation exam simulation",
          "Score calculation and results screen",
          "Offline mode",
        ],
        cta: "Start for free",
        featured: false,
        badge: "",
      },
      {
        name: "Premium",
        price: "4.99",
        currency: "₼",
        period: "per month",
        desc: "For the final months before the exam.",
        features: [
          "Unlimited questions and practice",
          "All block exam groups",
          "Smart review plan and weak topic analysis",
          "Detailed analytics and progress chart",
          "Ad-free experience",
        ],
        cta: "Get Premium",
        featured: true,
        badge: "Most popular",
      },
      {
        name: "Yearly",
        price: "39.99",
        currency: "₼",
        period: "per year",
        desc: "Two months free over the year.",
        features: [
          "Everything in Premium",
          "Yearly history and result archive",
          "Early access to new subjects",
          "Compare results with friends",
        ],
        cta: "Choose yearly",
        featured: false,
        badge: "2 months free",
      },
    ],
    note: "Prices are placeholders — replace them with your own plans.",
  },
  faq: {
    label: "FAQ",
    title: "Frequently asked questions",
    desc: "The ones we hear most often. Still stuck? Write to us.",
    items: [
      {
        q: "Is the app free?",
        a: "Yes. The question bank, exam simulation and scoring are free. Premium is an optional upgrade for unlimited practice, the smart review plan and detailed analytics.",
      },
      {
        q: "Does it work without internet?",
        a: "Yes. Every question is stored on your device after the first load, so the app works fully offline. When you are back online a new version downloads in the background.",
      },
      {
        q: "How do I install it?",
        a: "Open the app in your browser, then choose “Add to home screen” from the menu. On iPhone: Share → “Add to Home Screen” in Safari. After that it opens like a regular app.",
      },
      {
        q: "Does the scoring match the 2026 rules?",
        a: "Yes. Up to 300 points for the graduation exam and 400 for the block exam — 700 in total. In the block exam multiple choice and coded questions weigh 1.5 and written questions 1, with every 4 wrong answers cancelling one correct one.",
      },
      {
        q: "Where is my data stored?",
        a: "Results and settings stay on your device only. There is no account to create and nothing is sent to a server.",
      },
      {
        q: "Will it take up a lot of space?",
        a: "No. The app loads like a website and runs from cache, so there is no install package. Clearing the cache frees the space whenever you need it.",
      },
      {
        q: "Are new subjects and questions added?",
        a: "Yes, the bank keeps growing. When a new version is out the app notifies you and updates with a single tap.",
      },
    ],
  },
  cta: {
    title: "Start with the first question today.",
    desc: "No sign-up, no payment required. Open it, pick a subject and keep going.",
    primary: "Open the app",
    secondary: "Write to us",
    note: "Works on Android, iOS and desktop browsers",
  },
  footer: {
    tagline:
      "An independent mobile app for graduation and block exam preparation. Not affiliated with the State Examination Centre.",
    columns: [
      {
        title: "App",
        links: [
          { label: "Features", href: "#features" },
          { label: "Screens", href: "#screens" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Email", href: "mailto:salam@buraxilis.az" },
          { label: "Telegram", href: "https://t.me/buraxilis" },
          { label: "Instagram", href: "https://instagram.com/buraxilis" },
        ],
      },
    ],
    rights: "All rights reserved.",
  },
  mock: {
    exam: {
      app: "Block exam",
      timer: "2:48:12",
      counter: "12",
      total: "/ 30",
      question: "An object moving at 10 m/s travels how many metres in 5 seconds?",
      options: ["15 m", "50 m", "5 m", "500 m"],
      selected: 1,
      prev: "Previous",
      next: "Next",
    },
    result: {
      app: "Results",
      value: "612",
      max: "/ 700",
      caption: "Graduation 258 · Block 354",
      subjects: [
        { name: "Azerbaijani", value: 86 },
        { name: "Mathematics", value: 74 },
        { name: "Foreign language", value: 92 },
      ],
      cta: "Check eligibility",
    },
    smart: {
      app: "Smart prep",
      xpLabel: "XP",
      xp: "1,240",
      streakLabel: "Day streak",
      streak: "12",
      planTitle: "Today's plan",
      planValue: "18 / 30 questions",
      planPct: 60,
      weakTitle: "Weak topics",
      weak: [
        { name: "Chemistry · Moles", pct: 38 },
        { name: "History · 19th c.", pct: 52 },
        { name: "Physics · Circuits", pct: 64 },
      ],
    },
  },
};

export type Dictionary = typeof az;

export const dictionaries: Record<Locale, Dictionary> = { az, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
