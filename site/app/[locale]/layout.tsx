import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, isLocale, locales, type Locale } from "@/content/dictionaries";
import { site } from "@/content/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL("https://buraxilis.az"),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: site.fullName,
    alternates: {
      canonical: `/${locale}`,
      languages: { az: "/az", en: "/en" },
    },
    openGraph: {
      type: "website",
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: site.fullName,
      locale: locale === "az" ? "az_AZ" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    icons: {
      icon: "/favicon.svg",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale as Locale} suppressHydrationWarning>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a className="skip" href="#main">
          {locale === "az" ? "Əsas məzmuna keç" : "Skip to content"}
        </a>
        {children}
      </body>
    </html>
  );
}
