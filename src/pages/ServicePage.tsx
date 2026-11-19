import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICES, type PrestationAction } from "@/data/services";
import NotFound from "@/pages/NotFound";
import CtaBand from "@/components/CtaBand";
import Picture from "@/components/Picture";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import StatusPill from "@/components/StatusPill";
import PrerequisitesTerminal from "@/components/PrerequisitesTerminal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { serviceSrcSet } from "@/data/imageDimensions";
import { smoothScrollTo } from "@/utils/scroll";

/**
 * Détail d'une action de prestation.
 * - `href` seul : tout le détail est cliquable ;
 * - `href` + `linkText` : seule cette portion finale est cliquable, le reste
 *   demeure en texte courant (ex. renvoi vers un guide du centre de ressources).
 */
function ActionDetail({ action }: { action: PrestationAction }) {
  const classeLien =
    "text-ambre2 underline decoration-orange/40 underline-offset-4 transition-colors hover:decoration-orange2";

  if (!action.href) return <span>{action.detail}</span>;

  const debut = action.linkText
    ? action.detail.lastIndexOf(action.linkText)
    : -1;

  if (!action.linkText || debut === -1) {
    return (
      <Link to={action.href} className={classeLien}>
        {action.detail}
      </Link>
    );
  }

  return (
    <>
      <span>{action.detail.slice(0, debut)}</span>
      <Link to={action.href} className={classeLien}>
        {action.linkText}
      </Link>
      <span>{action.detail.slice(debut + action.linkText.length)}</span>
    </>
  );
}

/** Regroupe les actions consécutives partageant le même intitulé (`group`).
 *  Sans intitulé, toutes les actions forment un seul groupe — la mise en forme
 *  reste alors identique à celle des autres prestations. */
function grouperActions(actions: PrestationAction[]) {
  const groupes: { titre?: string; items: PrestationAction[] }[] = [];

  for (const action of actions) {
    const dernier = groupes[groupes.length - 1];
    if (dernier && dernier.titre === action.group) {
      dernier.items.push(action);
    } else {
      groupes.push({ titre: action.group, items: [action] });
    }
  }

  return groupes;
}

/**
 * Page détaillée d'un service : fil d'Ariane, hero propre au service,
 * prestations envisageables, limites techniques honnêtes, appel à la
 * contact et liens vers les autres services.
 */
export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Vidéo ambiante : certains navigateurs bloquent l'auto-play au tout
     premier rendu — relance explicite (muette, sans son, non bloquante). */
  useEffect(() => {
    const v = videoRef.current;
    if (v && v.paused) v.play().catch(() => {});
  }, [slug]);

  usePageMeta(
    service?.metaTitle ?? "Service introuvable",
    service?.metaDescription ?? "Service Singularity introuvable."
  );

  if (!service) return <NotFound />;

  const Icon = service.icon;
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  /* Visuel principal : moitié droite du hero à partir de 1024 px, pleine
     largeur en dessous. Le srcset n'existe que pour les images déclinées. */
  const imageSrcSet = serviceSrcSet(service.image);

  return (
    <>
      {/* --------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="absolute -right-40 -top-20 h-120 w-120 rounded-full bg-orange/8 blur-[130px]" />
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
              <span className="text-texte2/80">Services</span>
              <span className="mx-2.5 text-texte2/80">/</span>
              <span className="text-ambre2">{service.navName}</span>
            </nav>
          </Reveal>

          <div className="mt-12 grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
            <div className="relative">
              <span
                aria-hidden="true"
                className="ghost-num pointer-events-none absolute -top-16 -left-2 font-mono text-[7rem] leading-none font-bold select-none md:-top-20 md:text-[9rem]"
              >
                {service.number}
              </span>
              <Reveal>
                <p className="kicker relative">
                  Service {service.number} — Singularity
                </p>
                <h1 className="relative mt-5 max-w-xl font-display text-4xl leading-tight font-semibold tracking-normal text-blanc sm:text-5xl">
                  {service.name}
                </h1>
                <p className="relative mt-4 font-mono text-sm tracking-wide text-orange2">
                  {service.tagline}
                </p>
                <p className="relative mt-6 max-w-xl leading-relaxed text-texte2">
                  {service.intro}
                </p>
                <div className="relative mt-9 flex flex-col gap-4 sm:flex-row">
                  <Link to="/contact" className="btn btn-primary">
                    Contacter Singularity
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo("autres-services")}
                    className="btn btn-ghost cursor-pointer"
                  >
                    Les autres services
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Visuel encadré — vidéo ambiante si le service en fournit
                une, sinon image statique. */}
            <Reveal delay={150} className="relative">
              <div className="relative border border-bordure bg-surface/40 p-2">
                {service.video ? (
                  <video
                    ref={videoRef}
                    src={service.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    className={`${service.imageAspect ?? "aspect-4/3"} w-full object-cover`}
                  />
                ) : (
                  <Picture
                    src={service.image}
                    alt={service.imageAlt}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    sources={
                      imageSrcSet
                        ? [{ type: "image/webp", srcSet: imageSrcSet }]
                        : undefined
                    }
                    style={{ objectPosition: service.imageFocus ?? undefined }}
                    className={`${service.imageAspect ?? "aspect-4/3"} w-full object-cover`}
                  />
                )}
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
                  <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-texte2 uppercase">
                  Service {service.number}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ Prestations envisageables */}
      <section className="relative border-y border-bordure bg-noir2 py-16 md:py-24">
        <div className="absolute inset-0 grid-overlay opacity-25" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeader
            kicker="En pratique"
            title="Les prestations de ce pôle."
          />
          <div className="mt-12 flex flex-col gap-6">
            {service.prestations.map((p, i) => (
              <Reveal key={p.ref} delay={i * 60}>
                {/*Bloc en deux colonnes : le contenu de la prestation à gauche,
                   la fenêtre de prérequis (ou le visuel de repli) à droite. */}
                <article className="group neon-hover relative grid gap-6 border border-bordure bg-graphite/50 p-6 transition-all duration-300 hover:bg-graphite md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-px"
                    style={{
                      backgroundImage: `linear-gradient(180deg, ${service.accent}, transparent)`,
                    }}
                  />

                  {/* — Texte : priorité absolue au contenu — */}
                  <div className="min-w-0">
                    {/* Sur mobile : référence et pastille d'état sur la première
                        ligne, titre en dessous. À partir de sm, l'ordre d'origine
                        est conservé (référence, titre, pastille). */}
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <span className="font-mono text-sm font-medium text-orange2">
                        {p.ref}
                      </span>
                      <h3 className="max-sm:order-3 max-sm:basis-full font-display text-xl font-semibold text-blanc transition-colors duration-300 group-hover:text-ambre2">
                        {p.title}
                      </h3>
                      {p.status && (
                        <StatusPill
                          status={p.status}
                          className="max-sm:order-2 self-center max-sm:self-baseline"
                        />
                      )}
                    </div>

                    <span
                      aria-hidden="true"
                      className="mt-4 block h-px w-12"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${service.accent}, transparent)`,
                      }}
                    />

                    <p className="mt-4 font-mono text-xs tracking-[0.12em] text-ambre2 uppercase">
                      {p.objectif}
                    </p>

                    <div className="mt-4 grid max-w-3xl gap-5">
                      {grouperActions(p.actions).map((groupe, index) => (
                        <div key={groupe.titre ?? `groupe-${index}`}>
                          {groupe.titre && (
                            <p className="mb-2 inline-flex items-center border border-bordure px-2.5 py-1 font-mono text-[11px] tracking-[0.14em] text-sable-ambre uppercase">
                              {groupe.titre}
                            </p>
                          )}
                          <ul className="grid gap-2.5">
                            {groupe.items.map((action) => (
                              <li
                                key={action.label}
                                className="flex items-start gap-2.5 text-sm leading-relaxed text-texte2"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-[0.55rem] h-1 w-1 shrink-0 bg-ambre2"
                                />
                                <span>
                                  <strong className="font-semibold text-blanc">
                                    {action.label}
                                  </strong>
                                  <span> — </span>
                                  <ActionDetail action={action} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* — Prérequis : fenêtre de terminal macOS — */}
                  {p.prerequisites?.length ? (
                    <PrerequisitesTerminal
                      reference={p.ref}
                      items={p.prerequisites}
                      className="w-full self-center"
                    />
                  ) : p.image ? (
                    <div className="w-full max-w-[260px] self-center justify-self-start md:justify-self-end">
                      <div className="relative overflow-hidden border border-bordure bg-surface/40 p-1">
                        <Picture
                          src={p.image}
                          alt={p.imageAlt ?? p.title}
                          className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                          draggable={false}
                        />
                        <span
                          aria-hidden="true"
                          className="absolute top-1 left-1 h-3 w-3 border-t border-l border-orange2"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute right-1 bottom-1 h-3 w-3 border-r border-b border-orange2"
                        />
                      </div>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Appel à l'action */}
      <CtaBand />

      {/* --------------------------------------------- Autres services */}
      <section id="autres-services" className="scroll-mt-20 py-16 md:py-24">
        <div className="container-x">
          <SectionHeader
            kicker="Explorer"
            title="Les autres services Singularity."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group neon-hover flex items-center gap-5 border border-bordure bg-graphite/60 p-5 transition-all duration-300 hover:bg-graphite"
                >
                  <span className="font-mono text-sm text-orange2">{s.number}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-base font-semibold text-blanc">
                      {s.navName}
                    </h3>
                    <p className="mt-1 text-xs text-orange2">{s.tagline}</p>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 text-texte2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange2"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-10">
            <Link to="/" className="link-arrow group">
              <ArrowLeft className="h-4 w-4 text-orange2" aria-hidden="true" />
              Retour à l'accueil
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
