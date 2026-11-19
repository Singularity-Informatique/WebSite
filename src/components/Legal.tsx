import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

interface LegalPageProps {
  kicker: string;
  title: string;
  intro: string;
  updatedAt: string;
  children: ReactNode;
}

/** Gabarit commun des pages légales. */
export function LegalPage({
  kicker,
  title,
  intro,
  updatedAt,
  children,
}: LegalPageProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-bordure pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="absolute -right-40 -top-24 h-104 w-104 rounded-full bg-orange/8 blur-[130px]" />
        </div>
        <div className="container-x relative max-w-3xl">
          <Reveal>
            <p className="kicker">{kicker}</p>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-normal text-blanc sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 leading-relaxed text-texte2">{intro}</p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-texte2/90 uppercase">
              Dernière mise à jour : {updatedAt}
            </p>
          </Reveal>
        </div>
      </section>

      <article className="py-14 md:py-20">
        <div className="container-x max-w-3xl space-y-12">{children}</div>
      </article>
    </>
  );
}

interface LegalSectionProps {
  index: string;
  title: string;
  children: ReactNode;
}

/** Section numérotée d'une page légale. */
export function LegalSection({ index, title, children }: LegalSectionProps) {
  return (
    <Reveal>
      <section>
        <h2 className="flex items-baseline gap-4 font-display text-xl font-semibold text-blanc">
          <span className="font-mono text-sm font-medium text-orange2">
            {index}
          </span>
          {title}
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-texte2">
          {children}
        </div>
      </section>
    </Reveal>
  );
}
