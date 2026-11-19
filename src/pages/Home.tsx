import { Link } from "react-router-dom";
import {
  ArrowRight,
  LockKeyhole,
  Hourglass,
  ClipboardCheck,
} from "lucide-react";
import { SERVICES } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import SectionHeader from "@/components/SectionHeader";
import CtaBand from "@/components/CtaBand";
import Picture from "@/components/Picture";
import Reveal from "@/components/Reveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { smoothScrollTo } from "@/utils/scroll";

const VALUES = [
  {
    icon: ClipboardCheck,
    title: "Suivi",
    text: "Un rapport d’intervention détaillé et structuré, intégré à un carnet d’entretien numérique garantissant un historique fiable et durable de votre machine.",
  },
  {
    icon: Hourglass,
    title: "Durabilité",
    text: "Des solutions fiables, réparables et adaptées à vos besoins pour prolonger la durée de vie de votre équipement et limiter son renouvellement.",
  },
  {
    icon: LockKeyhole,
    title: "Confidentialité",
    text: "Des interventions réalisées en toute transparence, dans le respect de vos données personnelles et de vos choix technologiques.",
  },
];

export default function Home() {
  usePageMeta(
    "Services informatiques & sécurité numérique pour particuliers",
    "Singularity informatique fonde son approche sur la transparence des prestations, la durabilité des solutions et une attention constante portée à la sécurité et à la protection de vos données. Votre vie privée n'est pas une option, c’est notre engagement."
  );

  return (
    <>
      {/* ------------------------------------------------ Hero cinématique */}
      <section
        className="relative flex min-h-svh flex-col overflow-hidden"
        aria-label="Introduction"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Picture
            src="images/hero-datacenter.jpg"
            alt=""
            fetchPriority="high"
            sizes="100vw"
            sources={[
              {
                type: "image/webp",
                srcSet:
                  "images/hero-datacenter-640.webp 640w, images/hero-datacenter-960.webp 960w, images/hero-datacenter.webp 1365w",
              },
            ]}
            className="kenburns h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-noir/70 via-noir/15 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-noir/50 via-transparent to-noir/5" />
          <div className="absolute inset-0 grid-overlay opacity-35" />
          <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-orange/10 blur-[120px]" />
        </div>

        <div className="container-x relative flex flex-1 flex-col justify-end pt-32 pb-14 md:pb-20">
          <div className="max-w-4xl">
            <h1
              className="hero-fade font-display text-[clamp(1.9rem,3.7vw,2.7rem)] leading-tight font-semibold tracking-normal"
              style={{ animationDelay: "0.3s" }}
            >
            <span className="block text-white">
             Un Numérique Responsable.  
            </span>

            <span className="block text-gradient-amber">
             L'éthique Comme Fondation.
            </span>

            <span className="block text-gradient-warm">
             La Sécurité Par Conception.
            </span>
            </h1>

            <p
              className="hero-fade neon-frame mt-6 max-w-xl rounded-sm bg-noir/40 px-5 py-4 text-center text-lg leading-relaxed text-texte2 backdrop-blur-sm sm:text-xl"
              style={{ animationDelay: "0.45s" }}
            >
              Singularity informatique fonde son approche sur la transparence des prestations, 
              la durabilité des solutions et une attention constante portée à la sécurité et à la protection de vos données. 
              Votre vie privée n'est pas une option, c’est notre engagement.

            </p>

            <div
              className="hero-fade mt-9 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "0.6s" }}
            >
              <button
                type="button"
                onClick={() => smoothScrollTo("services")}
                className="btn btn-primary"
              >
                Découvrir les services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <Link to="/contact" className="btn btn-ghost">
                Contacter Singularity
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Bande des services */}
      <div
        className="overflow-hidden border-t border-b border-bordure bg-noir2 py-3.5"
        aria-hidden="true"
      >
        {/* Rail : chaque item porte sa marge, la moitié du rail est donc la
            largeur exacte d'une série de copies — boucle continue, même sur
            grand écran (7 blocs par moitié). */}
        <div className="marquee-track flex w-max items-center whitespace-nowrap">
          {Array.from({ length: 12 }, (_, copy) =>
            SERVICES.map((s) => (
              <span
                key={`${copy}-${s.slug}`}
                className="mr-10 flex items-center gap-10 font-mono text-[11px] tracking-[0.22em] text-texte2/90 uppercase"
              >
                {s.navName}
                <span className="h-1 w-1 rounded-full bg-orange/70" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ------------------------------------------------ Les sept services */}
      <section id="services" className="relative scroll-mt-20 py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              kicker="Nos services"
              title="Découvrez les Services Singularity."
            />
            <Reveal delay={150} className="hidden lg:block">
              <p
                aria-hidden="true"
                className="ghost-num font-mono text-8xl leading-none font-bold"
              >
                CYBER
              </p>
            </Reveal>
          </div>

          {/* Grille asymétrique : 7+5, puis 4+4+4, puis 6+6 (pôle Gaming et pôle IA en vis-à-vis) */}
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.slug} service={s} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ L'esprit Singularity */}
      <section className="relative overflow-hidden border-y border-bordure bg-noir2 py-20 md:py-28">
        <div className="absolute inset-0 grid-overlay opacity-30" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="relative border border-bordure bg-surface/40 p-2">
                <Picture
                  src="images/fibers.jpg"
                  alt="Fibres optiques lumineuses orange et ambre sur fond noir, sensation d'énergie circulant dans les connexions"
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover"
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
                  className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-orange2"
                />
              </div>
              <div className="absolute -bottom-4 left-6 flex items-center gap-2.5 border border-bordure bg-noir px-4 py-2.5">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-orange2" />
                <span className="font-mono text-[10px] tracking-[0.22em] text-texte2 uppercase">
                  Connexion
                </span>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeader
              kicker="L'esprit Singularity"
              title="Notre Engagement."
              intro="Singularity est née d’une conviction simple : proposer des solutions numériques fiables, respectueuses de la confidentialité et conçues pour durer, au service d’un numérique plus libre et plus responsable."
            />
            <div className="mt-10 space-y-7">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 100} className="flex gap-5">
                  <span className="flex h-11 w-11 flex-none items-center justify-center border border-bordure bg-graphite text-ambre2">
                    <v.icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-blanc">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-texte2">
                      {v.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Appel à l'action */}
      <CtaBand />
    </>
  );
}
