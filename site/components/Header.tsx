"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import type { Dictionary, Locale } from "@/content/dictionaries";
import { ArrowIcon } from "./Icons";

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: dict.nav.features },
    { href: "#screens", label: dict.nav.screens },
    { href: "#how", label: dict.nav.how },
    { href: "#pricing", label: dict.nav.pricing },
    { href: "#faq", label: dict.nav.faq },
  ];

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="container header__inner">
        <Link href={`/${locale}`} className="brand">
          <span className="brand__mark" aria-hidden="true" />
          {site.name}
          <span className="brand__version">{site.version}</span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} className="header__link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <div className="lang" role="group" aria-label="Language">
            <Link href="/az" aria-current={locale === "az" ? "true" : undefined} lang="az">
              AZ
            </Link>
            <Link href="/en" aria-current={locale === "en" ? "true" : undefined} lang="en">
              EN
            </Link>
          </div>
          <a className="btn btn--primary btn--sm" href={site.appUrl}>
            {dict.actions.open}
            <ArrowIcon />
          </a>
        </div>
      </div>

      <nav className="container header__mobile" aria-label="Sections">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
