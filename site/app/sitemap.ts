import type { MetadataRoute } from "next";
import { locales } from "@/content/dictionaries";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://buraxilis.az";
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "az" ? 1 : 0.8,
  }));
}
