/* ---------------------------------------------------------------------------
 * CONTENU ÉDITORIAL — LES SEPT PÔLES DE SERVICES SINGULARITY
 * ---------------------------------------------------------------------------
 * Les sept pôles constituent les activités confirmées.
 * Chaque pôle regroupe des prestations référencées (ex. DIA-001),
 * chacune avec un objectif précis et une description détaillée.
 * Voir README — section « Informations à compléter ».
 *
 * Note sur le pôle 07 : la pile technique est volontairement décrite
 * par sa fonction (moteur d'inférence local, interface web, réseau
 * privé chiffré) et non par ses noms de marque. Les références exactes
 * restent documentées en interne et communiquées au client à la mise
 * en service.
 * ------------------------------------------------------------------------- */

import {
  Bot,
  Cpu,
  Gamepad2,
  Gauge,
  HardDriveDownload,
  ScanSearch,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/** Condition à réunir avant l'intervention, affichée dans la fenêtre
 *  de prérequis de la prestation. */
export interface Prerequisite {
  label: string;
  detail: string;
}

/** Action concrète d'une prestation : un mot-clé mis en gras, puis son
 *  détail. La liste reste courte (3 à 4 entrées) pour un balayage rapide. */
export interface PrestationAction {
  label: string;
  detail: string;
  /** Intitulé de section facultatif. Les actions consécutives partageant le
   *  même intitulé sont regroupées sous un titre (ex. deux parcours : appareil
   *  cédé / appareil conservé). */
  group?: string;
  /** Lien interne optionnel : rend le détail cliquable (ex. renvoi vers un
   *  guide du centre de ressources). */
  href?: string;
  /** Portion finale du détail à rendre cliquable à la place du texte entier.
   *  Doit apparaître telle quelle dans `detail` ; le reste demeure en texte. */
  linkText?: string;
}

/** Condition d'intervention : le cadre commercial propre à un pôle
 *  (prise en charge, passage en atelier, déplacement). Affiché une seule
 *  fois, sous les prestations, et non répété dans chaque terminal. */
export interface InterventionCondition {
  label: string;
  detail: string;
}

export interface ServiceBlock {
  ref: string;
  title: string;
  objectif: string;
  actions: PrestationAction[];
  image?: string;
  imageAlt?: string;
  /** État de disponibilité de la prestation, affiché en pastille néon :
   *  - "actif"    : prestation ouverte à la demande (pastille verte)
   *  - "dev"      : en développement (pastille jaune)
   *  - "revision" : en révision, indisponible momentanément (pastille rouge) */
  status?: "actif" | "dev" | "revision";
  /** Prérequis à réunir avant l'intervention. Optionnel : en l'absence de
   *  liste, la prestation conserve sa mise en page d'origine. */
  prerequisites?: Prerequisite[];
}

export interface Service {
  slug: string;
  number: string;
  codePrefix: string;
  name: string;
  navName: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Vidéo ambiante optionnelle (muette, en boucle) affichée à la place
   *  de l'image dans le hero de la page du service. */
  video?: string;
  intro: string;
  prestations: ServiceBlock[];
  metaTitle: string;
  metaDescription: string;
  icon: LucideIcon;
  accent: string;
  cardSpan: string;
  /** Classe d'aspect du visuel du hero (par défaut 4/3 ; 16/9 dézoome). */
  imageAspect?: string;
  /** Classe d'aspect de la carte d'accueil (par défaut 16/9). Permet de
   *  dézoomer pour afficher l'intégralité d'une photo au ratio naturel. */
  cardAspect?: string;
  /** Mode d'ajustement de l'image dans son cadre ("object-fit") : "cover"
   *  (par défaut, recadre pour remplir) ou "contain" (affiche l'image en
   *  entier, bandes vides sur les côtés). */
  imageFit?: "cover" | "contain";
  /** Position de cadrage du visuel ("object-position") quand l'image
   *  dépasse du cadre — ex. "center 78%" pour centrer sur un sujet placé
   *  dans le bas de scène. Appliqué au visuel du hero et de la carte. */
  imageFocus?: string;
}

/** Cadre d'intervention : le mode de travail et les frais annexes. On le
 *  dit une seule fois, sur la page Contact, au moment où le client écrit —
 *  pas répété dans chaque page de service. */
export const INTERVENTION_CONDITIONS: InterventionCondition[] = [
  {
    label: "Prise en charge",
    detail: "Intervention directement au domicile du client.",
  },
  {
    label: "Passage en atelier",
    detail:
      "Récupération de l'appareil si une intervention en atelier est nécessaire.",
  },
  {
    label: "Déplacement",
    detail: "Les frais kilométriques sont calculés selon le trajet effectué.",
  },
];

export const SERVICES: Service[] = [
  {
    slug: "diagnostic-assistance",
    number: "01",
    codePrefix: "DIA",
    name: "Diagnostic & assistance",
    navName: "Diagnostic & assistance",
    tagline: "Identifier. Expliquer. Résoudre.",
    description: "Identifier l'origine d'un dysfonctionnement et évaluer les solutions envisageables.",
    image: "images/service-diagnostic.jpg",
    imageAlt:
      "Carte électronique examinée sous un éclairage ambré lors d'un diagnostic",
    imageAspect: "aspect-16/9",
    intro: "Chaque problème a son origine. Nous analysons votre situation, identifions les dysfonctionnements et évaluons les solutions envisageables. Du premier constat aux recommandations adaptées, nous privilégions une approche rigoureuse, transparente et proportionnée à vos besoins.",
    prestations: [
      {
        ref: "DIA-001",
        title: "Diagnostic",
        status: "actif",
        objectif: "Identifier. Analyser. Comprendre.",
        actions: [
          {
            label: "Matériel",
            detail: "État des composants, températures, stockage et intégrité matérielle.",
          },
          {
            label: "Logiciel",
            detail: "Système d'exploitation, pilotes, processus actifs et configuration logicielle.",
          },
          {
            label: "Performances",
            detail: "Réactivité du système, utilisation des ressources et stabilité générale.",
          },
        ],
        prerequisites: [
          {
            label: "Traçabilité de l'appareil",
            detail: "Historique des interventions, changements de composants et éventuels dommages physiques ou liquides.",
          },
          {
            label: "Contexte de la panne",
            detail: "Les symptômes observés, leur fréquence et, si possible, les messages d'erreur.",
          },
        ],
      },
      {
        ref: "DIA-002",
        title: "Assistance Informatique à distance",
        status: "actif",
        objectif: "L'essentiel, à distance.",
        actions: [
          {
            label: "Connexion sécurisée",
            detail: "Établissement d'un accès distant avec votre autorisation explicite, en votre présence.",
          },
          {
            label: "Assistance technique",
            detail: "Résolution des incidents courants, système, messagerie, logiciels et périphériques.",
          },
          {
            label: "Vérification",
            detail: "Contrôle du fonctionnement, validation des corrections et vérification des paramètres appliqués.",
          },
          {
            label: "Guide",
            detail: "Consultez notre centre de ressources pour accéder au guide d'installation d'AnyDesk.",
            href: "/ressources/guides/anydesk",
            linkText: "guide d'installation d'AnyDesk",
          },

        ],
        prerequisites: [
          {
            label: "Connexion internet stable",
            detail: "Un débit suffisant pour maintenir la session à distance sans interruption.",
          },
          {
            label: "Accès administrateur",
            detail: "Un compte disposant des droits nécessaires aux réglages du système.",
          },
        ],
      },
    ],
    metaTitle: "Diagnostic & assistance",
    metaDescription:
      "Identifier les dysfonctionnements et évaluer les solutions envisageables : diagnostic complet matériel et logiciel, assistance à distance.",
    icon: ScanSearch,
    accent: "#FF5A00",
    cardSpan: "md:col-span-1 lg:col-span-6",
  },
  {
    slug: "securite-protection",
    number: "02",
    codePrefix: "SEC",
    name: "Sécurité & protection",
    navName: "Sécurité & protection",
    tagline: "Protéger avec méthode et discernement.",
    description: "Protéger vos équipements, sécuriser vos accès et préserver votre confidentialité numérique.",
    image: "images/service-securite.jpg",
    imageAlt:
      "Processeur sur un circuit imprimé parcouru de traces ambrées lumineuses",
    intro: "La sécurité numérique repose sur un ensemble cohérent de réglages, de protections et de bonnes pratiques. Elle vise à réduire les risques au quotidien et à garantir une protection durable des environnements numériques.",
    prestations: [
      {
        ref: "SEC-001",
        title: "Sécurisation & Hardening",
        status: "actif",
        objectif: "Réduire la surface d'attaque et bloquer les vecteurs d'intrusion courants.",
        actions: [
          {
            label: "Système",
            detail: "Renforcement des paramètres de sécurité, mises à jour et configuration des protections essentielles.",
          },
          {
            label: "Authentification",
            detail: "MFA, gestionnaire de mots de passe, sécurisation des identifiants et limitation des privilèges.",
          },
          {
            label: "Exposition",
            detail: "Analyse des services actifs, contrôle des accès et désactivation des fonctionnalités non nécessaires.",
          },
          {
            label: "Référentiels",
            detail: "CIS Benchmarks et Microsoft Security Baselines.",
          },

        ],
        prerequisites: [
          {
            label: "Accès administrateur",
            detail: "Un compte disposant des droits nécessaires à la configuration des protections.",
          },
          {
            label: "Sauvegarde récente",
            detail: "Une copie à jour de vos fichiers importants, avant toute modification du système.",
          },
        ],
      },
      {
        ref: "SEC-002",
        title: "Analyse & Désinfection",
        status: "actif",
        objectif: "Éliminer les logiciels malveillants et restaurer un système sain.",
        actions: [
          {
            label: "Analyse approfondie",
            detail: "Détection des menaces sur le système et les supports.",
          },
          {
            label: "Élimination",
            detail: "Suppression des menaces et assainissement de la machine.",
          },
          {
            label: "Contrôle final",
            detail: "Vérification de l'intégrité du système après désinfection.",
          },
        ],
        prerequisites: [
          {
            label: "Préservation des données",
            detail:
              "Identification des données sensibles ou critiques.",
          },
          {
            label: "Maîtrise de l'environnement",
            detail: "Isolation de l'équipement du réseau afin de limiter la propagation éventuelle des menaces.",
          },
        ],
      },
      {
        ref: "SEC-003",
        title: "Sécurisation du Réseau Domestique",
        status: "dev",
        objectif: "Mettre votre réseau domestique à l'abri des accès indésirables.",
        actions: [
          {
            label: "Audit du réseau",
            detail: "Analyse de la box, du Wi-Fi et des équipements connectés.",
          },
          {
            label: "Appareils inconnus",
            detail: "Détection et neutralisation des accès non maîtrisés.",
          },
          {
            label: "Configuration sécurisée",
            detail: "Ports et services inutilisés fermés, Wi-Fi durci.",
          },
          {
            label: "Accès maîtrisés",
            detail: "Contrôle des appareils autorisés et des usages du réseau.",
          },
        ],
        prerequisites: [
          {
            label: "Accès à la box",
            detail: "Les identifiants d'administration du routeur ou de la box internet.",
          },
          {
            label: "Inventaire des appareils",
            detail: "La liste, même approximative, des équipements connectés au réseau domestique.",
          },
        ],
      },
    ],
    metaTitle: "Sécurité & protection",
    metaDescription:
      "Réduire les risques au quotidien et garantir une protection durable : sécurisation et hardening du poste, désinfection, réseau domestique durci.",
    icon: ShieldCheck,
    accent: "#FF7900",
    cardSpan: "md:col-span-1 lg:col-span-6",
  },
  {
    slug: "entretien-performance",
    number: "03",
    codePrefix: "ENT",
    name: "Entretien & performance",
    navName: "Entretien & performance",
    tagline: "Maintenir l'équilibre de votre environnement numérique.",
    description: "Préserver les performances, prolonger la durée de vie et maintenir la fiabilité de vos équipements.",
    image: "images/service-entretien.jpg",
    imageAlt:
      "Intérieur d'une unité centrale éclairée de tons orange chauds, composants propres",
    intro: "Prolonger la durée de vie de son matériel est aussi un choix responsable. Grâce à un entretien régulier et à des optimisations ciblées, nous préservons les performances et la fiabilité de vos équipements tout en encourageant des pratiques plus durables.",
    prestations: [
      {
        ref: "ENT-001",
        title: "Nettoyage Matériel",
        status: "actif",
        objectif: "Un entretien essentiel pour un fonctionnement durable.",
        actions: [
          {
            label: "Dépoussiérage complet",
            detail: "Ventilateurs, radiateurs, alimentation, filtres et composants.",
          },
          {
            label: "Maintenance thermique",
            detail: "Vérification de l'état de la pâte thermique et remplacement si nécessaire.",
          },
          {
            label: "Contrôle du refroidissement",
            detail: "Inspection du système de ventilation et des flux d'air.",
          },
          {
            label: "Validation thermique",
            detail: "Comparaison des températures avant et après intervention.",
          },
        ],
        prerequisites: [
          {
            label: "Signalement des anomalies",
            detail: "Toute modification de configuration, réparation antérieure ou particularité matérielle susceptible d'influencer l'intervention doit être communiquée.",
          },
        ],
      },
      {
        ref: "ENT-002",
        title: "Nettoyage Système & Optimisation des Performances",
        status: "actif",
        objectif: "Un système propre, à jour et réactif au quotidien.",
        actions: [
          {
            label: "Mises à jour",
            detail: "Système, pilotes et logiciels alignés sur les dernières versions.",
          },
          {
            label: "Assainissement",
            detail: "Suppression des programmes, composants obsolètes et services devenus inutiles.",
          },
          {
            label: "Maintenance des fichiers",
            detail: "Suppression des fichiers résiduels et temporaires.",
          },
          {
            label: "Entretien préventif",
            detail: "Réglages durables pour éviter l'accumulation.",
          },
          {
            label: "Audit des performances",
            detail: "Mesures des ralentissements et des ressources saturées.",
          },
          {
            label: "Optimisation ciblée",
            detail: "Réglages système, démarrage, services allégés, confidentialité, débloat et télémétrie.",
          },
          {
            label: "Mesures comparatives",
            detail: "Gain réel avant/après, documenté dans le rapport.",
          },
        ],
        prerequisites: [
          {
            label: "Accès administrateur",
            detail: "Un compte disposant des droits nécessaires aux mises à jour et aux suppressions.",
          },
          {
            label: "Particularités du système et usages",
            detail: "Toute configuration personnalisée, politique de sécurité ou contrainte logicielle doit être signalée, et les logiciels comme les activités principalement utilisés doivent être identifiés afin de privilégier les optimisations les plus pertinentes.",
          },
          {
            label: "Sauvegarde récente",
            detail: "Une copie à jour de vos fichiers importants, avant les opérations d'optimisations & nettoyage.",
          },
        ],
      },
    ],
    metaTitle: "Entretien & performance",
    metaDescription:
      "Prolonger la durée de vie de votre matériel par un entretien régulier : nettoyage matériel, nettoyage système et optimisation des performances.",
    icon: Gauge,
    accent: "#D99543",
    cardSpan: "lg:col-span-4",
  },
  {
    slug: "sauvegarde-recuperation",
    number: "04",
    codePrefix: "SVG",
    name: "Sauvegarde & récupération",
    navName: "Sauvegarde & récupération",
    tagline: "Parce que certaines données sont irremplaçables.",
    description: "Assurer la pérennité de vos données essentielles, et vous accompagner pour tenter de les retrouver lorsqu'elles disparaissent.",
    image: "images/service-sauvegarde.jpg",
    imageAlt:
      "Disques de stockage empilés, voyants d'activité ambrés dans la pénombre",
    imageAspect: "aspect-3/2",
    intro: "Photographies, documents, souvenirs ou fichiers professionnels : certaines données ont une valeur qui dépasse leur simple contenu. Nous vous accompagnons dans la mise en place de solutions de sauvegarde adaptées à vos besoins et intervenons également dans les situations de perte ou d'endommagement de données, avec attention et discernement.",
    prestations: [
      {
        ref: "SVG-001",
        title: "Stratégie de Sauvegarde des Données",
        status: "actif",
        objectif: "Préserver. Sécuriser. Restaurer.",
        actions: [
          {
            label: "Règle 3-2-1",
            detail: "Trois copies, deux supports, dont une hors site.",
          },
          {
            label: "Automatisation",
            detail: "Planification des sauvegardes.",
          },
          {
            label: "Intégrité",
            detail: "Vérification des sauvegardes et contrôle de la cohérence des données enregistrées.",
          },
          {
            label: "Restauration",
            detail: "Tests de récupération et validation de l'intégrité des fichiers avec vous.",
          },
        ],
        prerequisites: [
          {
            label: "Disque de sauvegarde",
            detail: "Un support dédié avec suffisamment d'espace libre pour accueillir l'intégralité des données à protéger.",
          },
          {
            label: "Espace de stockage cloud",
            detail: "Un compte actif et un quota adapté pour la copie hors site.",
          },
        ],
      },
      {
        ref: "SVG-002",
        title: "Récupération de Données",
        status: "actif",
        objectif: "Récupérer. Préserver. Restituer.",
        actions: [
          {
            label: "Diagnostic",
            detail: "Évaluation du support et des données récupérables.",
          },
          {
            label: "Extraction",
            detail: "Récupération des données avec des méthodes adaptées à l'état du support.",
          },
          {
            label: "Vie privée",
            detail: "Aucune consultation des données personnelles. Vous restez seul décisionnaire de leur ouverture, de leur identification et de leur vérification.",
          },
          {
            label: "Restitution",
            detail: "Transfert des fichiers sur un support sain.",
          },
          {
            label: "Expertise",
            detail: "Orientation vers un laboratoire spécialisé en cas de dommages physiques.",
          },
        ],
        prerequisites: [
          {
            label: "Identification des données sensibles",
            detail: "La présence éventuelle de données sensibles ou confidentielles doit être signalée.",
          },
          {
            label: "Support de restitution",
            detail: "Un support de destination adapté, disposant de l'espace nécessaire, doit être fourni pour permettre la restitution des fichiers récupérés.",
          },
        ],
      },
    ],
    metaTitle: "Sauvegarde & récupération",
    metaDescription:
      "Mettre en place une sauvegarde adaptée à vos besoins (stratégie 3-2-1) et récupérer vos données en cas de perte ou d'endommagement.",
    icon: HardDriveDownload,
    accent: "#FFAB48",
    cardSpan: "lg:col-span-4",
  },
  {
    slug: "installation-reparation-evolution",
    number: "05",
    codePrefix: "INS",
    name: "Installation, réparation & évolution",
    navName: "Installation & réparation",
    tagline: "Un environnement informatique maîtrisé.",
    description: "Des interventions précises, des solutions adaptées à vos usages, à chaque étape de votre environnement numérique.",
    image: "images/service-installation.jpg",
    imageAlt:
      "Composants informatiques — SSD, mémoire, câbles — disposés sur une surface sombre sous éclairage ambré",
    intro: "Chaque utilisateur a ses habitudes, ses attentes et ses priorités. Nous prenons le temps de comprendre vos objectifs pour installer, réparer ou faire évoluer votre matériel de manière cohérente. Chaque opération vise à garantir une configuration stable, fonctionnelle et adaptée à vos besoins présents comme futurs.",
    prestations: [
      {
        ref: "INS-001",
        title: "Réinstallation Système",
        status: "actif",
        objectif: "Retrouver l'essentiel. Repartir durablement.",
        actions: [
          {
            label: "Installation",
            detail: "Système réinstallé avec les derniers pilotes, correctifs et mises à jour essentiels.",
          },
          {
            label: "Données",
            detail: "Préservation et restauration de vos fichiers et de votre environnement.",
          },
          {
            label: "Configuration",
            detail: "Logiciels essentiels et paramètres utilisateurs.",
          },
          {
            label: "Optimisation",
            detail: "Réglages, stabilité et performances.",
          },
        ],
        prerequisites: [
          {
            label: "Sauvegarde complète",
            detail: "Une copie vérifiée de vos fichiers, avant l'effacement du système.",
          },
          {
            label: "Identifiants des comptes",
            detail: "Les accès à votre messagerie et aux services à réinstaller.",
          },
        ],
      },
      {
        ref: "INS-002",
        title: "Mise à Niveau Matérielle",
        status: "revision",
        objectif: "Plus de potentiel avec une mise à niveau ciblée.",
        actions: [
          {
            label: "Analyse",
            detail: "Évaluation des possibilités d'évolution matérielle.",
          },
          {
            label: "Conseil",
            detail: "Sélection des composants adaptés à votre équipement.",
          },
          {
            label: "Intégration",
            detail: "Installation et configuration des composants.",
          },
          {
            label: "Vérification",
            detail: "Performances, stabilité, contrôle de la fiabilité et des gains obtenus.",
          },
        ],
        prerequisites: [
          {
            label: "Particularités de l'équipement",
            detail: "Les composants déjà remplacés ou les modifications matérielles précédentes doivent être communiqués.",
          },
        ],
      },
      {
        ref: "INS-003",
        title: "Reconditionnement & Mise en Service",
        status: "actif",
        objectif: "Une seconde vie ou un nouvel équipement, sans perdre vos repères.",
        actions: [
          {
            group: "Appareil cédé",
            label: "État matériel",
            detail: "Contrôle technique, nettoyage et remise en état de l'équipement.",
          },
          {
            group: "Appareil cédé",
            label: "Effacement sécurisé",
            detail: "Suppression définitive et irréversible des données personnelles.",
          },
          {
            group: "Appareil cédé",
            label: "Déploiement système",
            detail: "Réinstallation, pilotes, mises à jour et configuration initiale.",
          },
          {
            group: "Appareil cédé",
            label: "Validation",
            detail: "Tests fonctionnels, contrôle de stabilité et préparation à la cession.",
          },
          {
            group: "Appareil conservé",
            label: "Initialisation",
            detail: "Configuration du système, comptes, applications et des mises à jour.",
          },
          {
            group: "Appareil conservé",
            label: "Migration",
            detail: "Transfert de vos données et reprise de votre environnement personnel.",
          },
          {
            group: "Appareil conservé",
            label: "Accompagnement",
            detail: "Vérification et présentation de votre environnement.",
          },
        ],
        prerequisites: [
          {
            label: "Sauvegarde des données personnelles",
            detail: "Les données personnelles doivent être sauvegardées avant toute opération : l'effacement réalisé est irréversible.",
          },
          {
            label: "Ancien et nouvel appareil",
            detail: "Les deux machines disponibles pour le transfert des données.",
          },
          {
            label: "Identifiants des comptes",
            detail: "Les accès à votre messagerie et aux services à configurer.",
          },
        ],
      },
    ],
    metaTitle: "Installation, réparation & évolution",
    metaDescription:
      "Installer, réparer ou faire évoluer votre matériel : réinstallation système, mise à niveau, reconditionnement et mise en service, adaptés à vos besoins.",
    icon: Cpu,
    accent: "#FF5A00",
    cardSpan: "md:col-span-2 lg:col-span-4",
  },
  {
    slug: "gaming-retro",
    number: "06",
    codePrefix: "GAM",
    name: "Gaming IT & rétro-gaming",
    navName: "Gaming IT & rétro-gaming",
    tagline: "Jouer sans compromis, hier comme aujourd'hui.",
    description: "Optimiser vos performances en jeu et vous accompagner dans la conception de stations rétro-gaming adaptées à vos envies.",
    image: "images/service-gaming.jpg",
    imageAlt:
      "Configurations de jeu et station rétro-gaming éclairées de lueurs ambrées dans une pièce sombre",
    // Dezoom : ratio naturel de la photo (5/4) dans le hero = image entière
    // sans recadrage ; la carte d'accueil focalise sur le bas de scène où
    // se trouve le sujet principal (la voiture).
    imageAspect: "aspect-[5/4]",
    imageFocus: "center bottom",
    cardAspect: "aspect-video",
    intro: "De l'analyse des composants aux vérifications de fonctionnement, nous portons une attention particulière à l'ensemble de l'environnement informatique. Performances, stabilité, refroidissement, connectivité et compatibilité sont évalués pour proposer des interventions adaptées aux caractéristiques de chaque équipement.",
    prestations: [
      {
        ref: "GAM-001",
        title: "Optimisation des Performances de Jeu",
        status: "dev",
        objectif: "Plus de stabilité. Une meilleure fluidité. Des réglages maîtrisés.",
        actions: [
          {
            label: "Mesurer",
            detail: "FPS, 1 % Low, frametimes, latence et températures.",
          },
          {
            label: "Optimiser",
            detail: "Système, pilotes et processus (overclocking sur accord préalable).",
          },
          {
            label: "Ajuster",
            detail: "Paramètres graphiques selon votre matériel.",
          },
          {
            label: "Benchmark",
            detail: "Comparatif des performances avant et après intervention.",
          },
        ],
        prerequisites: [
          {
            label: "Configuration fonctionnelle",
            detail: "Un PC qui démarre, avec les jeux concernés déjà installés.",
          },
          {
            label: "Signalement des problèmes",
            detail: "Les ralentissements, chutes de FPS, saccades ou problèmes de fluidité doivent être communiqués.",
          },
        ],
      },
      {
        ref: "GAM-002",
        title: "Rétro-gaming",
        status: "actif",
        objectif: "Votre station rétro, votre bibliothèque, votre liberté.",
        actions: [
          {
            label: "Conception",
            detail: "Choix et installation des solutions d'émulation.",
          },
          {
            label: "Organisation",
            detail: "Structuration de votre bibliothèque et de vos contenus autorisés.",
          },
          {
            label: "Transmission et autonomie",
            detail: "Accompagnement dans l'installation, la configuration, la gestion des sauvegardes et la maintenance de votre station.",
          },
        ],
        prerequisites: [
          {
            label: "Espace de stockage",
            detail: "Un disque disposant de la place nécessaire pour la bibliothèque et les émulations.",
          },
          {
            label: "Manettes à configurer",
            detail: "Les contrôleurs prévus pour la station rétro, avec leurs câbles ou adaptateurs.",
          },
        ],
      },
    ],
    metaTitle: "Gaming IT & rétro-gaming",
    metaDescription:
      "Performances, stabilité, refroidissement et compatibilité : des interventions adaptées aux caractéristiques de chaque configuration de jeu, moderne ou rétro.",
    icon: Gamepad2,
    accent: "#FFB54D",
    cardSpan: "md:col-span-2 lg:col-span-6",
  },
  {
    slug: "ia-locale-solutions",
    number: "07",
    codePrefix: "IA",
    name: "IA locale & solutions intelligentes",
    navName: "IA locale & solutions",
    tagline: "Vos outils, vos données, votre environnement.",
    description: "Des solutions d'intelligence artificielle locales, respectueuses de votre vie privée et de vos données.",
    image: "images/service-securite.jpg",
    imageAlt:
      "Processeur sur un circuit imprimé parcouru de traces ambrées lumineuses, symbole d'une intelligence artificielle exécutée localement",
    // Vidéo ambiante du pôle 07 (public/videos/service-ia.mp4) — affichée
    // dans le hero de la page du service, en repli de l'image.
    video: "videos/service-ia.mp4",
    imageAspect: "aspect-16/9",
    intro: "Les solutions d'intelligence artificielle en ligne reposent généralement sur des infrastructures externes, impliquant le traitement de vos échanges par des services tiers. Il existe une autre voie : déployer un environnement d'IA local, basé sur des modèles et des outils libres, hébergés directement sur votre propre infrastructure matérielle. Une solution qui favorise l'indépendance numérique et permet de garder ses données dans un environnement que l'on maîtrise.",
    prestations: [
      {
        ref: "IA-001",
        title: "Assistant IA Local & Accès Sécurisé",
        status: "actif",
        objectif: "Un assistant privé, disponible partout, sans rien concéder.",
        actions: [
          {
            label: "Moteur local",
            detail: "Inférence exécutée sur votre machine, sans envoi de vos données.",
          },
          {
            label: "Interface dédiée",
            detail: "Un espace de conversation moderne, installé et configuré.",
          },
          {
            label: "Accès distant chiffré",
            detail: "Connexion sécurisée depuis l'extérieur, sans port exposé.",
          },
          {
            label: "Modèles et comptes",
            detail: "Sélection selon votre matériel et gestion des utilisateurs.",
          },
        ],
        prerequisites: [
          {
            label: "Machine dédiée",
            detail: "Un ordinateur disponible en continu, avec la mémoire nécessaire à l'exécution locale des modèles.",
          },
          {
            label: "Réseau domestique stable",
            detail: "Une connexion fiable et un routeur permettant la mise en place de l'accès distant chiffré.",
          },
        ],
      },
    ],
    metaTitle: "IA locale & solutions intelligentes",
    metaDescription:
      "Déployer un environnement d'IA local, basé sur des modèles et des outils libres, hébergés sur votre matériel : vos données restent maîtrisées.",
    icon: Bot,
    accent: "#FFCC57",
    cardSpan: "md:col-span-2 lg:col-span-6",
  },
];
