import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

interface SectionHeaderProps {
  kicker: string;
  title: ReactNode;
  intro?: string;
  className?: string;
}

/** En-tête de section éditorial : étiquette, titre et introduction. */
export default function SectionHeader({
  kicker,
  title,
  intro,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal className={className}>
      <p className="kicker">{kicker}</p>
      <h2 className="mt-5 font-display text-3xl leading-tight font-semibold tracking-normal text-blanc sm:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-texte2">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
