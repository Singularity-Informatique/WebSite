import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  MonitorSmartphone,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { usePageMeta } from "@/hooks/usePageMeta";

const ANYDESK_DOWNLOAD_URL = "https://anydesk.com/fr/downloads";

interface AnyDeskStep {
  title: string;
  text: string;
}

const STEPS_ANYDESK: AnyDeskStep[] = [
  {
    title: "Télécharger AnyDesk depuis le site officiel",
    text: "Rendez-vous sur la page officielle de téléchargement (lien ci-dessus) et récupérez la version correspondant à votre système : Windows, macOS ou Linux. Téléchargez uniquement depuis ce site : aucune autre source ne doit être utilisée.",
  },
  {
    title: "Installer le logiciel",
    text: "Ouvrez le fichier téléchargé puis lancez l’installation. Les paramètres par défaut conviennent à la plupart des usages personnels : AnyDesk s’installe en quelques instants et se retrouve dans le menu de vos applications.",
  },
  {
    title: "Repérer votre identifiant",
    text: "Lancez AnyDesk : la fenêtre principale affiche un identifiant unique — un numéro à neuf chiffres — ainsi que le nom de votre ordinateur. C’est ce numéro qui permet à votre intervenant de vous joindre. Il est propre à votre machine et ne donne accès à rien tant que vous n’acceptez pas une connexion.",
  },
  {
    title: "Transmettre l’identifiant à votre intervenant",
    text: "Communiquez ce numéro uniquement à la personne avec laquelle vous avez convenu d’un rendez-vous, par un canal de confiance : téléphone, courriel connu ou messagerie habituelle.",
  },
  {
    title: "Valider la demande de connexion",
    text: "Quand l’intervenant appelle votre machine, une notification s’affiche dans AnyDesk : vérifiez que le nom et l’identifiant affichés correspondent bien à la personne attendue, puis acceptez. Pendant toute la session, vous voyez ce qui se passe à l’écran : rien ne se fait à votre insu.",
  },
  {
    title: "Terminer proprement la session",
    text: "À la fin de l’intervention, informez votre intervenant : il ferme la connexion, et vous pouvez quitter AnyDesk. La session s’arrête immédiatement ; AnyDesk ne peut pas reprendre la main en dehors d’une connexion que vous avez acceptée.",
  },
];

interface Prerequisite {
  title: string;
  text: string;
  icon: typeof ShieldCheck;
}

const PREREQUISITES: Prerequisite[] = [
  {
    title: "Un ordinateur allumé",
    text: "La machine concernée par l’assistance, connectée et prête à être utilisée pendant le rendez-vous.",
    icon: MonitorSmartphone,
  },
  {
    title: "Une connexion Internet",
    text: "La prise en main à distance transite par Internet : une connexion stable suffit, le débit nécessaire est très faible.",
    icon: Wifi,
  },
  {
    title: "Quelques minutes",
    text: "Téléchargement, installation et première connexion tiennent en quelques minutes : la prise en main est rapide.",
    icon: Clock,
  },
  {
    title: "Un rendez-vous convenu",
    text: "L’essentiel n’est pas technique : un échange préalable avec votre intervenant, un horaire et un canal pour le joindre.",
    icon: ShieldCheck,
  },
];

export default function RessourcesGuideAnyDesk() {
  usePageMeta(
    "Guide AnyDesk",
    "Retrouvez les étapes essentielles pour prendre en main AnyDesk et établir vos premières connexions simplement et en toute sécurité."
  );

  return (
    <>
      {/* --------------------------------------------- Présentation + prérequis */}
      <section className="relative border-b border-bordure bg-noir2 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 grid-overlay opacity-25" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal>
            <p className="kicker">Comprendre l’outil</p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl leading-tight font-semibold tracking-normal text-blanc sm:text-5xl">
              L’assistance, simplement et à distance.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-texte2">
              Une solution d’assistance à distance pour intervenir sur votre
              ordinateur avec votre autorisation. Une approche simple et
              transparente qui facilite l’accompagnement technique, tout en
              vous permettant de suivre les opérations en temps réel.
            </p>
          </Reveal>

          {/* Prérequis */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PREREQUISITES.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="h-full border border-bordure bg-graphite/60 p-5">
                  <span className="flex h-10 w-10 items-center justify-center border border-bordure bg-noir text-ambre2">
                    <item.icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 font-display text-base font-semibold text-blanc">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-texte2">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Téléchargement officiel */}
          <Reveal delay={160}>
            <div className="mt-8 flex flex-col gap-5 border border-bordure bg-graphite/60 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <h2 className="font-display text-lg font-semibold text-blanc">
                  Téléchargement officiel
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-texte2">
                  Le téléchargement se fait uniquement sur le site de l’éditeur
                  : choisissez votre système, la
                  plateforme propose le fichier adapté.
                </p>
                <p className="mt-3 font-mono text-xs tracking-[0.14em] text-orange2">
                  {ANYDESK_DOWNLOAD_URL.replace("https://", "")}
                </p>
              </div>
              <a
                href={ANYDESK_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex-none"
              >
                Aller sur la page officielle
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------- Étapes d'installation */}
      <section className="relative py-16 md:py-24">
        <div className="container-x">
          <SectionHeader
            kicker="Pas à pas"
            title="Installer et utiliser AnyDesk."
          />

          <div className="mt-12">
            {STEPS_ANYDESK.map((step, i) => (
              <Reveal key={step.title} delay={i * 40}>
                <div className="group grid gap-5 border-t border-bordure px-1 py-7 transition-colors duration-300 hover:bg-blanc/2 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-6 md:px-3">
                  <span className="pt-1 font-mono text-sm font-medium text-orange2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-blanc transition-colors duration-300 group-hover:text-ambre2">
                      {step.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-texte2">
                      {step.text}
                    </p>
                  </div>
                </div>
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

      {/* ----------------------------------------------------- Appel à l'action */}
      <CtaBand />
    </>
  );
}
