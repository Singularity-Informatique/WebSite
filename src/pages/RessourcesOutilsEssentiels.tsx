import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, FileSearch, GlobeLock, MailWarning, TriangleAlert } from "lucide-react";
import CarteOutil, { type ToolEntry } from "@/components/CarteOutil";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { usePageMeta } from "@/hooks/usePageMeta";

/** Vérificateurs publics : contrôler avant d'agir. */
const VERIFICATIONS: ToolEntry[] = [
  {
    forWhat: "Vérifier une fuite de données",
    name: "Have I Been Pwned",
    url: "https://haveibeenpwned.com/",
    description:
      "Vérifiez si une adresse e-mail apparaît dans une fuite de données connue. La base recense plusieurs milliards d'adresses compromises, avec le détail des services concernés et des données exposées.",
    why: "La référence internationale, animée par le chercheur en sécurité Troy Hunt et utilisée par les professionnels du domaine. Aucune inscription : saisissez l'adresse, lisez le rapport, changez le mot de passe concerné si nécessaire.",
    alternative: {
      label: "Alternative souveraine : HPI Identity Leak Checker (Allemagne)",
      url: "https://sec.hpi.de/ilc",
      text: "Maintenu par l'université de Potsdam : conforme au RGPD, le résultat n'est transmis que par e-mail au propriétaire de la boîte.",
    },
    icon: MailWarning,
  },
  {
    forWhat: "Vérifier un fichier ou un lien suspect",
    name: "VirusTotal",
    url: "https://www.virustotal.com/",
    description:
      "Soumettez un fichier ou une URL : plus de 70 moteurs de sécurité l'analysent en quelques secondes et vous signalent toute détection, avec un rapport détaillé.",
    why: "Le standard de facto des laboratoires d'analyse, en accès gratuit et sans installation. Détenu par Google, il opère depuis l'Europe via son entité de droit irlandais.",
    icon: FileSearch,
  },
  {
    forWhat: "Vérifier une adresse web",
    name: "F-Secure Link Checker",
    url: "https://www.f-secure.com/fr/link-checker",
    description:
      "Vérifiez la sécurité d'un lien sans l'ouvrir : évitez les sites malveillants et les fraudes en ligne. Le résultat s'affiche en quatre niveaux — sécurisé, suspect, dangereux ou inconnu — et indique la nature de la page derrière le lien.",
    why: "L'alternative européenne de cette liste : F-Secure est un éditeur de cybersécurité finlandais, coté à Helsinki, avec plus de 35 ans d'expérience et des résultats certifiés par des organismes de test indépendants.",
    icon: GlobeLock,
  },
];

export default function RessourcesOutilsEssentiels() {
  usePageMeta(
    "Outils essentiels en ligne",
    "Parce que la protection commence par la vérification, nous mettons à votre disposition des outils publics pour une approche plus éclairée, autonome et maîtrisée."
  );

  return (
    <>
      {/* ------------------------------------------------- Les vérificateurs */}
      <section className="relative border-b border-bordure bg-noir2 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 grid-overlay opacity-25" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal>
            <p className="kicker">Volet 01 — Vérifier, en ligne</p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl leading-tight font-semibold tracking-normal text-blanc sm:text-5xl">
              Outils Essentiels.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-texte2">
              La sécurité repose avant tout sur de bonnes pratiques. 
              Nous mettons à votre disposition une sélection de vérificateurs publics, accessibles librement,
              pour vous permettre de mieux comprendre votre environnement numérique,
              de protéger votre vie privée et adopter les bons réflexes.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VERIFICATIONS.map((outil, i) => (
              <CarteOutil key={outil.url} tool={outil} delay={i * 60} />
            ))}
          </div>

        </div>
      </section>

      {/* Bandeau de navigation — retour à la rubrique */}
      <section className="border-b border-bordure bg-noir2">
        <div className="container-x py-3.5">
          <Link
            to="/ressources/outils"
            className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-texte2 uppercase transition-colors hover:text-orange2"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 text-orange2 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Retour à Espaces Numériques
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------ Avertissement */}
      <section className="relative pt-16 pb-16 md:pt-28 md:pb-24">
        <div className="container-x">
          <Reveal>
            <div className="relative border border-bordure bg-graphite/60 p-6 md:p-8">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px"
                style={{
                  backgroundImage: "linear-gradient(180deg, #FF5A00, transparent)",
                }}
              />
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center border border-bordure bg-noir text-ambre2">
                  <TriangleAlert
                    className="h-5 w-5"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-blanc">
                    La sécurité exige du discernement.
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-texte2">
                    <li className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 flex-none rounded-full bg-orange2"
                      />
                      <span>
                        Les outils d'analyse permettent d'identifier de nombreuses menaces, mais aucun résultat ne garantit une sécurité absolue. Un fichier non détecté n'est pas nécessairement inoffensif, et un lien considéré comme fiable peut évoluer à tout moment.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 flex-none rounded-full bg-orange2"
                      />
                      <span>
                        La confidentialité de vos données reste également essentielle. Évitez de transmettre des documents personnels, confidentiels ou professionnels à des plateformes d'analyse publiques : leur traitement implique de confier vos données à un service tiers.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 flex-none rounded-full bg-orange2"
                      />
                      <span>
                        Si une analyse soulève des doutes, ou si vous souhaitez examiner un élément sensible, privilégiez un diagnostic adapté plutôt que l'envoi de vos documents sur une plateforme publique.
                      </span>
                    </li>
                  </ul>
                  <Link to="/contact" className="link-arrow mt-6">
                    Demander un diagnostic complet
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- Appel à l'action */}
      <CtaBand />
    </>
  );
}
