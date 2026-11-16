import { site } from "@/content/site";
import type { Dictionary } from "@/content/dictionaries";
import { ArrowIcon, CheckIcon, FeatureIcon, ShieldIcon } from "./Icons";
import { PhoneExam, PhoneResult, PhoneSmart } from "./PhoneMock";
import { Reveal } from "./Reveal";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__grid">
          <div>
            <span className="hero__badge">
              <span className="pulse" aria-hidden="true" />
              {dict.hero.badge}
            </span>
            <h1 className="hero__title">{dict.hero.title}</h1>
            <p className="hero__sub">{dict.hero.subtitle}</p>
            <div className="hero__actions">
              <a className="btn btn--primary" href={site.appUrl}>
                {dict.hero.primary}
                <ArrowIcon />
              </a>
              <a className="btn btn--ghost" href="#how">
                {dict.hero.secondary}
              </a>
            </div>
            <p className="hero__note">
              <ShieldIcon />
              {dict.hero.note}
            </p>
          </div>
          <div className="hero__phones">
            <PhoneExam mock={dict.mock} />
          </div>
        </div>

        <div className="stats">
          {dict.stats.map((stat) => (
            <div className="stats__item" key={stat.label}>
              <div className="stats__value">{stat.value}</div>
              <div className="stats__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Features({ dict }: { dict: Dictionary }) {
  return (
    <section id="features" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">{dict.features.label}</span>
          <h2 className="section-title">{dict.features.title}</h2>
          <p className="section-desc">{dict.features.desc}</p>
        </Reveal>

        <Reveal>
          <div className="features">
            {dict.features.items.map((item) => (
              <article className="feature" key={item.title}>
                <div className="feature__icon">
                  <FeatureIcon name={item.icon} />
                </div>
                <h3 className="feature__title">{item.title}</h3>
                <p className="feature__desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Screens({ dict }: { dict: Dictionary }) {
  const captions = dict.screens.captions;
  return (
    <section id="screens" className="section section--tint">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">{dict.screens.label}</span>
          <h2 className="section-title">{dict.screens.title}</h2>
          <p className="section-desc">{dict.screens.desc}</p>
        </Reveal>

        <div className="screens">
          <Reveal className="screen">
            <PhoneResult mock={dict.mock} />
            <p className="screen__caption">{captions[0]}</p>
          </Reveal>
          <Reveal className="screen" delay={80}>
            <PhoneSmart mock={dict.mock} />
            <p className="screen__caption">{captions[1]}</p>
          </Reveal>
          <Reveal className="screen" delay={160}>
            <PhoneExam mock={dict.mock} />
            <p className="screen__caption">{captions[2]}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Steps({ dict }: { dict: Dictionary }) {
  return (
    <section id="how" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">{dict.how.label}</span>
          <h2 className="section-title">{dict.how.title}</h2>
          <p className="section-desc">{dict.how.desc}</p>
        </Reveal>

        <div className="steps">
          {dict.how.steps.map((step, index) => (
            <Reveal className="step" key={step.n} delay={index * 70}>
              <div className="step__n">{step.n}</div>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__desc">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Quotes({ dict }: { dict: Dictionary }) {
  return (
    <section className="section section--tint">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">{dict.testimonials.label}</span>
          <h2 className="section-title">{dict.testimonials.title}</h2>
          <p className="section-desc">{dict.testimonials.desc}</p>
        </Reveal>

        <div className="quotes">
          {dict.testimonials.items.map((item, index) => (
            <Reveal className="quote" key={item.name} delay={index * 70}>
              <span className="quote__mark" aria-hidden="true">
                &ldquo;
              </span>
              <p className="quote__text">{item.quote}</p>
              <div className="quote__author">
                <span className="quote__avatar" aria-hidden="true">
                  {item.name.slice(0, 1)}
                </span>
                <span>
                  <span className="quote__name">{item.name}</span>
                  <br />
                  <span className="quote__role">{item.role}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing({ dict }: { dict: Dictionary }) {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">{dict.pricing.label}</span>
          <h2 className="section-title">{dict.pricing.title}</h2>
          <p className="section-desc">{dict.pricing.desc}</p>
        </Reveal>

        <div className="plans">
          {dict.pricing.plans.map((plan) => (
            <Reveal className={`plan ${plan.featured ? "plan--featured" : ""}`} key={plan.name}>
              {plan.badge ? <span className="plan__badge">{plan.badge}</span> : null}
              <div>
                <div className="plan__name">{plan.name}</div>
                <div className="plan__price">
                  {plan.price}
                  <small>{plan.currency}</small>
                </div>
                <div className="plan__period">{plan.period}</div>
              </div>
              <p className="plan__desc">{plan.desc}</p>
              <ul className="plan__features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="plan__cta">
                <a
                  className={`btn ${plan.featured ? "btn--invert" : "btn--ghost"}`}
                  href={site.appUrl}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="plan-note">{dict.pricing.note}</p>
      </div>
    </section>
  );
}

export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section id="faq" className="section section--tint">
      <div className="container faq">
        <Reveal>
          <span className="eyebrow">{dict.faq.label}</span>
          <h2 className="section-title">{dict.faq.title}</h2>
          <p className="section-desc">{dict.faq.desc}</p>
          <p style={{ marginTop: 20 }}>
            <a className="btn btn--ghost btn--sm" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </Reveal>

        <div className="faq__list">
          {dict.faq.items.map((item) => (
            <details className="faq__item" key={item.q}>
              <summary>
                {item.q}
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <p className="faq__answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaPanel({ dict }: { dict: Dictionary }) {
  return (
    <section className="section" style={{ paddingBottom: 0 }}>
      <div className="container">
        <Reveal className="cta-panel">
          <h2 className="cta-panel__title">{dict.cta.title}</h2>
          <p className="cta-panel__desc">{dict.cta.desc}</p>
          <div className="cta-panel__actions">
            <a className="btn btn--invert" href={site.appUrl}>
              {dict.cta.primary}
              <ArrowIcon />
            </a>
            <a className="btn btn--ghost" href={`mailto:${site.email}`} style={{ borderColor: "currentColor" }}>
              {dict.cta.secondary}
            </a>
          </div>
          <p className="cta-panel__note">{dict.cta.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
