import {
  ArrowLeft,
  ExternalLink,
  Flag,
  Landmark,
  LifeBuoy,
  Lock,
  Newspaper,
  Siren,
  TriangleAlert,
} from "lucide-react";
import { Link } from "react-router-dom";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { usePageMeta } from "@/hooks/usePageMeta";

interface UsefulResource {
  title: string;
  url: string;
  description: string;
  /** Cas d'usage concret, affiché sur la carte. */
  forWhat: string;
  icon: typeof Landmark;
}

/* Actualités technologiques : sources de veille gratuites, accessibles
   à un public de particuliers. Sélection volontairement resserrée
   (dixit brief : épurer, ne pas surcharger). */
const NEWS_SOURCES: UsefulResource[] = [
  {
    title: "IT-Connect",
    url: "https://www.it-connect.fr/actualites/",
    description:
      "Actualités IT & tech et tutoriels en administration système, réseau et cybersécurité : Windows, Linux, infrastructure et veille sécurité, rédigés par des administrateurs systèmes français.",
    forWhat: "Suivre l'actu IT & cybersécurité",
    icon: Newspaper,
  },
  {
    title: "Korben.info",
    url: "https://korben.info/",
    description:
      "Un des plus anciens blogs tech de France : veille quotidienne sur la tech, la sécurité informatique et le web, avec un ton accessible et des tutos concrets.",
    forWhat: "Rester à jour au quotidien",
    icon: Newspaper,
  },
  {
    title: "Vision IA",
    url: "https://vision-ia.beehiiv.com/",
    description:
      "Newsletter française dédiée à l'intelligence artificielle : l'essentiel résumé et sourcé — modèles, produits, usages et coulisses des grands acteurs.",
    forWhat: "Suivre l'IA au fil de l'eau",
    icon: Newspaper,
  },
];

/* Cybersécurité : organismes officiels et plateformes de signalement. */
const CYBER_RESOURCES: UsefulResource[] = [
  {
    title: "Cybermalveillance.gouv.fr",
    url: "https://www.cybermalveillance.gouv.fr/",
    description:
      "La plateforme nationale d'assistance : après un rançongiciel, un vol de compte ou une fraude en ligne, fiches réflexes pas à pas et orientation vers un spécialiste.",
    forWhat: "Être guidé après un incident",
    icon: LifeBuoy,
  },
  {
    title: "CERT-FR",
    url: "https://www.cert.ssi.gouv.fr/",
    description:
      "Le centre gouvernemental de veille et d'alerte sur les cyberattaques : avis de vulnérabilités, campagnes de rançongiciels et bulletins officiels.",
    forWhat: "Suivre les alertes et cyberattaques",
    icon: Siren,
  },
  {
    title: "CNIL",
    url: "https://www.cnil.fr/",
    description:
      "L'autorité française de protection des données personnelles : vos droits (accès, rectification, suppression), les cookies et les bonnes pratiques face aux applications.",
    forWhat: "Protéger vos données personnelles",
    icon: Lock,
  },
  {
    title: "ANSSI",
    url: "https://www.ssi.gouv.fr/",
    description:
      "L'agence nationale de la sécurité des systèmes d'information : recommandations officielles (mots de passe, double authentification, sauvegardes) et conseils pratiques.",
    forWhat: "Se former aux bons réflexes",
    icon: Landmark,
  },
  {
    title: "Internet-Signalement",
    url: "https://www.internet-signalement.gouv.fr/",
    description:
      "La plateforme officielle (Pharos) pour signaler un contenu ou un comportement illicite en ligne : arnaques, harcèlement, comptes usurpés.",
    forWhat: "Signaler un contenu illicite",
    icon: Flag,
  },
  {
    title: "SignalConso",
    url: "https://signal.conso.gouv.fr/",
    description:
      "Le service public de la DGCCRF pour signaler une arnaque ou une pratique commerciale trompeuse d'un professionnel : faux e-commerce, démarchage abusif.",
    forWhat: "Signaler une arnaque commerciale",
    icon: TriangleAlert,
  },
];

export default function RessourcesLiensSecurite() {
  usePageMeta(
    "Liens utiles",
    "Retrouvez des sources d'actualité et des organismes de référence pour vous informer, prévenir les risques, réagir face aux menaces et effectuer vos signalements."
  );

  return (
    <>
      {/* ------------------------------------------------------- Introduction */}
      <section className="relative overflow-hidden border-b border-bordure bg-noir2 pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="absolute inset-0 grid-overlay opacity-25" aria-hidden="true" />
        <div className="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-orange/8 blur-[120px]" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal>
            <p className="kicker">S'informer &amp; s'orienter</p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl leading-tight font-semibold tracking-normal text-blanc sm:text-5xl">
              L'information, première ligne de protection.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-texte2">
              Retrouvez des sources d'actualité et des organismes de référence
              pour vous informer, prévenir les risques, réagir face aux menaces
              et effectuer vos signalements. Des ressources fiables pour
              avancer avec discernement dans un environnement numérique en
              constante évolution.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------- Actualités technologiques */}
      <section className="relative border-b border-bordure bg-noir pt-14 pb-16 md:pb-24">
        <div className="container-x relative">
          <Reveal>
            <p className="kicker">Volet 01 — Veille</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-normal text-blanc sm:text-3xl">
              Actualités technologiques.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {NEWS_SOURCES.map((source, i) => (
              <Reveal key={source.url} delay={i * 60}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group neon-hover flex h-full flex-col border border-bordure bg-graphite p-6 transition-all duration-500 hover:border-orange/50 hover:bg-graphite"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-none items-center justify-center border border-bordure/80 bg-noir text-ambre2">
                      <source.icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3 className="min-w-0 flex-1 break-words font-display text-lg font-semibold text-blanc transition-colors duration-300 group-hover:text-ambre2">
                      {source.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-blanc/85">
                    {source.description}
                  </p>
                  <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-orange2 uppercase">
                    {source.forWhat}
                  </p>
                  <span className="link-arrow mt-6">
                    Voir la source
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only"> (nouvel onglet)</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------- Cybersécurité & cyberattaques */}
      <section className="relative bg-noir2 pt-14 pb-16 md:pb-24">
        <div className="container-x relative">
          <Reveal>
            <p className="kicker">Volet 02 — Officiel</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-normal text-blanc sm:text-3xl">
              Cybersécurité &amp; cyberattaques.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {CYBER_RESOURCES.map((resource, i) => (
              <Reveal key={resource.url} delay={i * 60}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group neon-hover flex h-full flex-col border border-bordure bg-graphite p-5 transition-all duration-500 hover:border-orange/50 hover:bg-graphite"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-none items-center justify-center border border-bordure/80 bg-noir text-ambre2">
                      <resource.icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3 className="min-w-0 flex-1 break-words font-display text-lg font-semibold text-blanc transition-colors duration-300 group-hover:text-ambre2">
                      {resource.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-blanc/85">
                    {resource.description}
                  </p>
                  <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-orange2 uppercase">
                    {resource.forWhat}
                  </p>
                  <span className="link-arrow mt-6">
                    Visiter le site
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only"> (nouvel onglet)</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* Bandeau de navigation — retour à la rubrique */}
      <section className="border-y border-bordure bg-noir2">
        <div className="container-x py-3.5">
          <Link
            to="/ressources/guides-liens"
            className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-texte2 uppercase transition-colors hover:text-orange2"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 text-orange2 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Retour à Guides &amp; liens utiles
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------- Appel à l'action */}
      <CtaBand />
    </>
  );
}
