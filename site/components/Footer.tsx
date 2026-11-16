import { site } from "@/content/site";
import type { Dictionary, Locale } from "@/content/dictionaries";

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="brand">
              <span className="brand__mark" aria-hidden="true" />
              {site.fullName}
            </div>
            <p className="footer__tagline">{dict.footer.tagline}</p>
          </div>

          {dict.footer.columns.map((column) => (
            <div key={column.title}>
              <div className="footer__title">{column.title}</div>
              <div className="footer__links">
                {column.links.map((link) => (
                  <a key={link.label} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {site.fullName} · {site.version} · {dict.footer.rights}
          </span>
          <span>
            <a href={`/${locale === "az" ? "en" : "az"}`}>{dict.langSwitchTo}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
