import {
  SiCss,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

interface Tech {
  name: string;
  Logo: typeof SiReact;
  /** Couleur officielle de la marque (icônes monochromes colorisées). */
  color: string;
  /** Site officiel de l'outil (ou documentation de référence). */
  href: string;
}

interface TechGroup {
  /** Sens du groupe, annoncé aux lecteurs d'écran. */
  label: string;
  techs: Tech[];
}

/**
 * Ordre méthodique, par couches : le code et l'interface d'abord, les
 * fondations du document en clôture. Les groupes sont séparés par un
 * filet vertical à partir de xl — la seule largeur où la ligne complète
 * tient sans se replier ; en dessous, un écart plus large les distingue.
 *
 *   1. Langages ...... JavaScript, TypeScript
 *   2. Interface ..... React, Tailwind CSS
 *   3. Outillage ..... Vite, Node.js
 *   4. Structure & style ... HTML5, CSS3
 *
 * HTML, CSS et JavaScript n'ont pas d'« éditeur » : ils renvoient vers la
 * documentation de référence MDN (version française), seule source
 * réellement tenue à jour pour ces trois langages du web.
 */
const TECH_GROUPS: TechGroup[] = [
  {
    label: "Langages",
    techs: [
      {
        name: "JavaScript",
        Logo: SiJavascript,
        color: "#F7DF1E",
        href: "https://developer.mozilla.org/fr/docs/Web/JavaScript",
      },
      {
        name: "TypeScript",
        Logo: SiTypescript,
        color: "#3178C6",
        href: "https://www.typescriptlang.org/fr/",
      },
    ],
  },
  {
    label: "Interface",
    techs: [
      {
        name: "React",
        Logo: SiReact,
        color: "#61DAFB",
        href: "https://fr.react.dev/",
      },
      {
        name: "Tailwind CSS",
        Logo: SiTailwindcss,
        color: "#06B6D4",
        href: "https://tailwindcss.com/",
      },
    ],
  },
  {
    label: "Outillage",
    techs: [
      {
        name: "Vite",
        Logo: SiVite,
        color: "#9135FF",
        href: "https://vite.dev/",
      },
      {
        name: "Node.js",
        Logo: SiNodedotjs,
        color: "#5FA04E",
        href: "https://nodejs.org/fr",
      },
    ],
  },
  {
    label: "Structure et style",
    techs: [
      {
        name: "HTML5",
        Logo: SiHtml5,
        color: "#E34F26",
        href: "https://developer.mozilla.org/fr/docs/Web/HTML",
      },
      {
        name: "CSS3",
        Logo: SiCss,
        color: "#1572B6",
        href: "https://developer.mozilla.org/fr/docs/Web/CSS",
      },
    ],
  },
];

/**
 * Bandeau « vitrine technologique » : ligne fixe, sans défilement.
 * Le libellé « Développé avec » porte un spectre lumineux balayé de
 * gauche à droite (`.developpe-avec`, index.css).
 *
 * Chaque outil est un lien vers son site officiel. Sur mobile, les noms
 * disparaissent pour que les huit logos tiennent sur une seule ligne ;
 * `aria-label` préserve alors le nom accessible de chaque lien.
 *
 * Chaque groupe est indivisible : il se déplace d'un bloc quand la ligne
 * se replie, si bien qu'un filet ne se retrouve jamais orphelin en fin de
 * ligne. Géométrie et filets sont décrits dans `.tech-groups` /
 * `.tech-group` (index.css).
 *
 * Intégré une seule fois dans App.tsx, juste avant le Footer,
 * il apparaît donc sur toutes les pages.
 */
export default function TechMarquee() {
  return (
    <section
      aria-label="Technologies utilisées pour ce site"
      className="border-y border-bordure bg-noir py-5"
    >
      <div className="container-x flex flex-col items-center gap-3.5 lg:flex-row lg:justify-center lg:gap-7">
        <p
          className="developpe-avec shrink-0 font-mono text-[10.5px] font-medium tracking-[0.3em] whitespace-nowrap uppercase"
          data-text="Développé avec ✨"
        >
          Développé avec ✨
        </p>

        <span
          aria-hidden="true"
          className="hidden h-px w-12 shrink-0 bg-bordure lg:block"
        />

        <ul className="tech-groups">
          {TECH_GROUPS.map((group) => (
            <li key={group.label} className="tech-group">
              <span className="sr-only">{group.label} :</span>
              <ul className="flex list-none items-center gap-x-4 p-0 sm:gap-x-5">
                {group.techs.map((t) => (
                  <li key={t.name} className="flex items-center">
                    <a
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.name} — site officiel (nouvel onglet)`}
                      className="group flex items-center gap-2.5 rounded-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange2"
                    >
                      <t.Logo
                        className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: t.color }}
                        aria-hidden="true"
                      />
                      <span className="hidden font-mono text-[11px] tracking-[0.18em] text-texte2/80 uppercase transition-colors duration-300 group-hover:text-blanc sm:inline">
                        {t.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
