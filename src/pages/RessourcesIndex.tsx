import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import Picture from "@/components/Picture";
import Reveal from "@/components/Reveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { cn } from "@/utils/cn";
import { findResourceCategory } from "@/data/resources";
import type { ResourceArticle } from "@/data/resources";
import { smoothScrollTo } from "@/utils/scroll";
import NotFound from "@/pages/NotFound";

interface RessourcesIndexProps {
  /** Slug de la rubrique : "outils" | "guides-liens". */
  slug: string;
}

/**
 * Page intermédiaire d'une rubrique du centre de ressources :
 * entre la redirection /ressources (→ /ressources/outils) et les articles.
 * Une rubrique
 * peut réunir plusieurs volets (sections distinctes, clairement séparées).
 */
export default function RessourcesIndex({ slug }: RessourcesIndexProps) {
  const category = findResourceCategory(slug);
  usePageMeta(
    category ? category.navName : "Ressources",
    category
      ? `${category.navName} — Centre de ressources Singularity : ${category.description}`
      : "Centre de ressources Singularity."
  );
  if (!category) return <NotFound />;

  return (
    <>
      {/* --------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b border-bordure pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="absolute -right-40 -top-24 h-112 w-md rounded-full bg-orange/8 blur-[130px]" />
        </div>
        <div className="container-x relative">
          {/* Fil d'Ariane */}
          <Reveal>
            <nav
              aria-label="Fil d'Ariane"
              className="font-mono text-[11px] tracking-[0.18em] text-texte2 uppercase"
            >
              <Link to="/" className="transition-colors hover:text-blanc">
                Accueil
              </Link>
              <span className="mx-2.5 text-texte2/80">/</span>
              <span className="text-ambre2">{category.navName}</span>
            </nav>
          </Reveal>

          {/* Texte à gauche, visuel encadré à droite (comme les pages services) */}
          <div
            className={cn(
              "mt-12 grid items-center gap-14",
              category.image && "lg:grid-cols-[1.05fr_1fr]"
            )}
          >
            <Reveal>
              <p className="kicker">Centre de ressources — Rubrique {category.number}</p>
              <h1 className="mt-5 max-w-2xl font-display text-4xl leading-tight font-semibold tracking-normal text-blanc sm:text-5xl">
                {category.navName}.
              </h1>
              <p className="mt-6 max-w-xl leading-relaxed text-texte2">
                {category.indexIntro}
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                {/* Conduit aux sujets de la rubrique, plus bas dans la page. */}
                <button
                  type="button"
                  onClick={() => smoothScrollTo("sujets-rubrique")}
                  className="btn btn-primary cursor-pointer"
                >
                  Explorer cette rubrique
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <Link to="/contact" className="btn btn-ghost">
                  Contacter Singularity
                </Link>
              </div>
            </Reveal>

            {/* Visuel encadré — présent dès le premier écran : chargé avec la
                page (pas de différé), sinon il apparaît avec un retard visible. */}
            {category.image && (
              <Reveal delay={150} className="relative">
                <div className="relative border border-bordure bg-surface/40 p-2">
                  <Picture
                    src={category.image}
                    alt={category.imageAlt ?? ""}
                    className="aspect-video w-full object-cover"
                  />
                  {/* Équerres d'angle */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-orange2"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-orange2"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-orange2"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-0 bottom-0 h-5 w-5 border-r-2 border-b-2 border-orange2"
                  />
                </div>
                <div className="absolute -bottom-5 left-6 flex items-center gap-3 border border-bordure bg-noir px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center bg-orange text-noir">
                    <category.icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-texte2 uppercase">
                    Rubrique {category.number}
                  </span>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* --------------------------------------- Les sujets de la rubrique, en 2 colonnes */}
      <section id="sujets-rubrique" className="relative scroll-mt-20 py-16 md:py-24">
        <div className="absolute inset-0 grid-overlay opacity-25" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal className="grid gap-5 md:grid-cols-2">
            {category.sections.map((section) =>
              section.articles.map((article) => (
                <CarteArticle key={article.to} article={article} />
              ))
            )}
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- Appel à l'action */}
      <CtaBand />
    </>
  );
}

/** Carte d'article, alignée sur les composants du site. */
function CarteArticle({ article }: { article: ResourceArticle }) {
  return (
    <Link
      to={article.to}
      className="group neon-hover flex flex-col gap-6 border border-bordure bg-graphite/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-graphite md:flex-row md:items-center md:gap-8 md:p-8"
    >
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] tracking-[0.18em] text-orange2 uppercase">
          {article.path}
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold text-blanc transition-colors duration-300 group-hover:text-ambre2 sm:text-2xl">
          {article.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-texte2">
          {article.summary}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="flex h-10 w-10 flex-none items-center justify-center border border-bordure bg-noir text-ambre2 transition-colors duration-300 group-hover:border-orange2/50"
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

