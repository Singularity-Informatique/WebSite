import { ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";

/** Une entrée d'outil : le socle commun des fiches outils du site. */
export interface ToolEntry {
  /** Cas d'usage, affiché en libellé mono au-dessus du nom. */
  forWhat: string;
  /** Nom de l'outil. */
  name: string;
  /** Adresse de l'outil. */
  url: string;
  description: string;
  /** Pourquoi cet outil a été retenu (pertinence, souveraineté...). */
  why: string;
  /** Alternative européenne souveraine, documentée en pleine transparence. */
  alternative?: { label: string; url: string; text: string };
  icon: typeof ExternalLink;
}

/** Fiche d'outil, identique sur toutes les pages « outils » du site. */
export default function CarteOutil({
  tool,
  delay,
}: {
  tool: ToolEntry;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="group neon-hover flex h-full flex-col border border-bordure bg-graphite/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-graphite">
        <p className="font-mono text-[11px] tracking-[0.14em] text-orange2 uppercase">
          {tool.forWhat}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center border border-bordure bg-noir text-ambre2">
            <tool.icon
              className="h-5 w-5"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </span>
          <h3 className="font-display text-lg font-semibold text-blanc">
            {tool.name}
          </h3>
        </div>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-texte2">
          {tool.description}
        </p>
        <p className="mt-4 text-xs leading-relaxed text-texte2/80">
          <span className="font-mono text-[11px] tracking-[0.1em] text-ambre2 uppercase">
            Notre choix :{" "}
          </span>
          {tool.why}
        </p>
        {tool.alternative && (
          <div className="mt-4 border border-bordure bg-noir/60 p-4">
            <p className="font-mono text-[11px] tracking-[0.12em] text-blanc uppercase">
              {tool.alternative.label}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-texte2">
              {tool.alternative.text}
            </p>
            <a
              href={tool.alternative.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow mt-3 text-sm"
            >
              Découvrir l'alternative
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          </div>
        )}
        <span className="mt-6">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost w-full px-4 py-2.5 text-sm transition-colors group-hover:border-orange2/50"
          >
            Ouvrir l'outil
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </span>
      </article>
    </Reveal>
  );
}
