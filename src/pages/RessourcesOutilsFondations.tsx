import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Fingerprint, HardDrive, KeyRound, TriangleAlert } from "lucide-react";
import CarteOutil, { type ToolEntry } from "@/components/CarteOutil";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { usePageMeta } from "@/hooks/usePageMeta";

/** Fondations open source : bâtir sainement, durer sainement. */
const FONDATIONS: ToolEntry[] = [
  {
    forWhat: "Construire un coffre de mots de passe",
    name: "KeePassXC",
    url: "https://keepassxc.org/",
    description:
      "Gestionnaire de mots de passe chiffré, qui fonctionne entièrement hors ligne : votre coffre reste sur vos appareils, jamais chez un tiers. Compatible avec les fichiers KeePass, disponible sur Windows, macOS et Linux.",
    why: "Open source, audité publiquement, sans compte ni abonnement ni télémétrie : le chiffrement s'exécute sur votre machine, la clé n'appartient qu'à vous. La fondation la plus simple de la sécurité — et la plus solide.",
    icon: KeyRound,
  },
  {
    forWhat: "Construire un chiffrement intégral",
    name: "VeraCrypt",
    url: "https://www.veracrypt.fr/",
    description:
      "Chiffrement complet de disques, de partitions et de clés USB : un ordinateur perdu ou volé ne livre plus rien sans la clé. L'héritier direct de TrueCrypt, maintenu activement et gratuitement.",
    why: "Logiciel libre doté d'un code auditable, dont le chiffrement rend les données illisibles sans la clé : ce que l'on ne peut pas lire ne peut ni être revendu ni être exploité. Une hygiène de base recommandée par les guides officiels — mais encore trop peu appliquée.",
    icon: HardDrive,
  },
  {
    forWhat: "Construire une navigation protégée",
    name: "LibreWolf",
    url: "https://librewolf.net/",
    description:
      "Le navigateur Firefox, durci pour la confidentialité : télémétrie retirée, uBlock Origin intégré, protection renforcée contre le pistage et l'empreinte numérique. Aucune donnée n'est envoyée à un tiers — ni recommandations sponsorisées, ni service imposé.",
    why: "Un fork communautaire indépendant de Firefox, sans arrière-pensée commerciale : la confidentialité n'y est pas une option de réglage, c'est la fondation du logiciel. En contrepartie, assumée en toute transparence : pas de synchronisation intégrée — vos favoris et vos mots de passe restent chez vous.",
    icon: Fingerprint,
  },
];

export default function RessourcesOutilsFondations() {
  usePageMeta(
    "Des fondations libres",
    "Des solutions open source choisies pour leur intégrité, leur transparence au service d'un environnement informatique plus responsable."
  );

  return (
    <>
      {/* --------------------------------------------------- Les fondations */}
      <section className="relative border-b border-bordure bg-noir2 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 grid-overlay opacity-25" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal>
            <p className="kicker">Volet 02 — Bâtir, sainement</p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl leading-tight font-semibold tracking-normal text-blanc sm:text-5xl">
              Des fondations libres.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-texte2">
              La sécurité n'est pas seulement réactive : elle se bâtit en
              amont, avec des logiciels open source — code auditable, sans
              compte imposé ni télémétrie, indépendants des plateformes
              publicitaires. Une sélection de fondations que nous installons
              et configurons régulièrement, amenée à grandir avec
              l'expérience.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {FONDATIONS.map((outil, i) => (
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

      {/* ------------------------------------------------------- À savoir */}
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
                    Des outils fiables, à condition d'être bien configurés :
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-texte2">
                    <li className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 flex-none rounded-full bg-orange2"
                      />
                      <span>
                        Nous privilégions des solutions open source pour leur transparence, leur indépendance et leur respect de la confidentialité.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 flex-none rounded-full bg-orange2"
                      />
                      <span>
                        Mais un outil ne vaut que par la manière dont il est déployé. La robustesse des accès, la gestion des clés de chiffrement, la fiabilité des sauvegardes et le maintien à jour des logiciels constituent autant de fondations indispensables.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 flex-none rounded-full bg-orange2"
                      />
                      <span>
                        De l'installation au paramétrage, nous prenons en charge les étapes essentielles pour vous fournir des outils opérationnels, configurés avec soin et intégrés à une démarche de protection durable.
                      </span>
                    </li>
                  </ul>
                  <Link to="/contact" className="link-arrow mt-6">
                    Faire installer ces fondations
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
