/* ---------------------------------------------------------------------------
 * CONTENU ÉDITORIAL — CENTRE DE RESSOURCES SINGULARITY
 * ---------------------------------------------------------------------------
 * Architecture : rubrique (page intermédiaire) → article. Le hub
 * « Centre de ressources » a été retiré : /ressources redirige vers la
 * première rubrique. Une page intermédiaire regroupe un ou plusieurs
 * « volets » (sections distinctes) ; chaque volet référence ses articles.
 * Source unique pour le menu déroulant de l'en-tête et les pages
 * intermédiaires.
 * ------------------------------------------------------------------------- */

import {
  BookOpen,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/** Article référencé depuis un volet d'une rubrique. */
export interface ResourceArticle {
  title: string;
  /** Chemin mono affiché sur la carte (fil d'emplacement). */
  path: string;
  summary: string;
  to: string;
}

/** Volet d'une rubrique : une section distincte de la page intermédiaire. */
export interface ResourceSection {
  /** Titre du volet (facultatif : un volet sans titre n'affiche que ses cartes). */
  title?: string;
  /** Petit numéro affiché à côté du titre (facultatif). */
  label?: string;
  intro?: string;
  icon?: LucideIcon;
  articles: ResourceArticle[];
}

export interface ResourceCategory {
  slug: string;
  number: string;
  navName: string;
  /** Introduction de la page intermédiaire de la rubrique. */
  indexIntro: string;
  description: string;
  /** Page intermédiaire de la rubrique. */
  to: string;
  icon: LucideIcon;
  /** Visuel du héros de la page intermédiaire (facultatif — affiché à droite du texte). */
  image?: string;
  imageAlt?: string;
  /** Volets de la rubrique, affichés comme sections distinctes. */
  sections: ResourceSection[];
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    slug: "outils",
    number: "01",
    navName: "Espaces Numériques",
    indexIntro:
      "Un environnement numérique sain ne se décrète pas : il se construit, puis s'entretient. Cette rubrique réunit deux familles d'instruments complémentaires : d'un côté, des vérificateurs publics et éprouvés pour contrôler sans attendre ; de l'autre, des fondations open source, auditables, pour bâtir sans dépendre. La sécurité n'est pas une réparation d'urgence : c'est une discipline de construction.",
    description:
      "Vérifier vos données, bâtir des fondations saines : des vérificateurs publics et des logiciels open source, choisis avec exigence.",
    to: "/ressources/outils",
    icon: Wrench,
    image: "images/Rubrique-01.jpg",
    imageAlt:
      "Maquette numérique d'architecture s'élevant depuis des plans techniques — une informatique saine se construit, fondation par fondation",
    sections: [
      {
        articles: [
          {
            title: "Outils essentiels en ligne",
            path: "Rubrique 01 — En ligne",
            summary:
              "Parce que la protection commence par la vérification, nous mettons à votre disposition des outils publics pour une approche plus éclairée, autonome et maîtrisée.",
            to: "/ressources/outils/essentiels-en-ligne",
          },
        ],
      },
      {
        articles: [
          {
            title: "Des fondations libres",
            path: "Rubrique 01 — Fondations libres",
            summary:
              "Des solutions open source choisies pour leur intégrité, leur transparence au service d'un environnement informatique plus responsable.",
            to: "/ressources/outils/fondations-libres",
          },
        ],
      },
    ],
  },
  {
    slug: "guides-liens",
    number: "02",
    navName: "Guides & liens utiles",
    indexIntro:
      "Comprendre avant d'agir, s'orienter vers des sources fiables. Cette rubrique réunit deux volets complémentaires : d'un côté des guides pas-à-pas, pour mettre en service un outil et vous en servir en confiance ; de l'autre, les organismes officiels vers lesquels ce tourner pour vous informer, réagir et vous protéger. Deux manières de reprendre la main — apprendre et s'appuyer sur des sources vérifiées.",
    description:
      "Des guides et des organismes officiels : apprendre pas à pas, signaler un incident et se protéger.",
    to: "/ressources/guides-liens",
    icon: BookOpen,
    image: "images/Rubrique-03.jpg",
    imageAlt:
      "Regard attentif traversé par des lignes de code — la vigilance comme première ligne de défense",
    sections: [
      {
        articles: [
          {
            title: "Guide d'installation AnyDesk",
            path: "Rubrique 02 — Guides",
            summary:
              "Retrouvez les étapes essentielles pour prendre en main AnyDesk et établir vos premières connexions simplement et en toute sécurité.",
            to: "/ressources/guides/anydesk",
          },
        ],
      },
      {
        articles: [
          {
            title: "Liens utiles et sécurité informatique",
            path: "Rubrique 02 — Liens utiles",
            summary:
              "Une sélection de sources et d'organismes de référence pour mieux comprendre les évolutions, suivre les tendances et approfondir les enjeux technologiques.",
            to: "/ressources/liens/securite-informatique",
          },
        ],
      },
    ],
  },
];

/** Retrouve une rubrique par son slug. */
export function findResourceCategory(slug: string) {
  return RESOURCE_CATEGORIES.find((c) => c.slug === slug);
}
