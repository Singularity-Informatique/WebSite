import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Éléments concernés : les cartes néon et les deux familles de boutons. */
const SELECTEUR = ".neon-hover, .btn-primary, .btn-ghost";

/** Appareils sans survol réel : téléphones et tablettes tactiles. */
const REQUETE_SANS_SURVOL = "(hover: none) and (pointer: coarse)";

/**
 * Allume le néon des cartes et des boutons à l'arrivée dans l'écran,
 * et l'éteint à la sortie.
 *
 * Pourquoi : sur un appareil tactile, `:hover` n'existe pas. Le navigateur
 * le simule au moment du tap — d'où un éclair orange d'une demi-seconde,
 * juste avant que le lien ne change de page. Ce composant remplace cette
 * dépendance au survol par la position réelle de l'élément dans l'écran.
 *
 * Portée : n'agit que si la requête média « sans survol » est satisfaite.
 * Sur ordinateur, rien n'est observé et le survol reste inchangé.
 */
export default function NeonOnView() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (typeof window.matchMedia !== "function") return;
    if (!window.matchMedia(REQUETE_SANS_SURVOL).matches) return;

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          entree.target.classList.toggle("is-lit", entree.isIntersecting);
        }
      },
      /* Réserve de 6 % en haut et en bas : l'allumage intervient quand
         l'élément est franchement entré, pas sur un liseré de pixels. */
      { threshold: 0, rootMargin: "-6% 0px -6% 0px" }
    );

    const observes = new WeakSet<Element>();

    const scanner = () => {
      const cibles = document.querySelectorAll<HTMLElement>(SELECTEUR);
      cibles.forEach((cible) => {
        if (observes.has(cible)) return;
        observes.add(cible);
        observateur.observe(cible);
      });
    };

    scanner();

    /* Les pages hors accueil sont chargées à la demande (chunks) : leur
       contenu peut apparaître après ce premier passage. On rescanne donc
       à chaque modification du DOM, au plus une fois par image. */
    let planifie = false;
    const mutateur = new MutationObserver(() => {
      if (planifie) return;
      planifie = true;
      requestAnimationFrame(() => {
        planifie = false;
        scanner();
      });
    });
    mutateur.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutateur.disconnect();
      observateur.disconnect();
      document
        .querySelectorAll<HTMLElement>(SELECTEUR)
        .forEach((cible) => cible.classList.remove("is-lit"));
    };
  }, [pathname]);

  return null;
}
