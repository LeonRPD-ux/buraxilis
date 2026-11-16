import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  CtaPanel,
  Faq,
  Features,
  Hero,
  Pricing,
  Quotes,
  Screens,
  Steps,
} from "@/components/Sections";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main id="main">
        <Hero dict={dict} />
        <Features dict={dict} />
        <Screens dict={dict} />
        <Steps dict={dict} />
        <Quotes dict={dict} />
        <Pricing dict={dict} />
        <Faq dict={dict} />
        <CtaPanel dict={dict} />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
