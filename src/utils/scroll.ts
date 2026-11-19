/**
 * Défilement doux vers une section de la page, puis déplacement du focus
 * dans cette section. Respecte la préférence système « prefers-reduced-motion ».
 *
 * Le focus accompagne toujours le défilement : sans lui, la touche Tab
 * ramène la page à son point de départ (le bouton d'origine) et les
 * lecteurs d'écran ne signalent pas le déplacement. Cible : le premier
 * titre de la section (le plus parlant), à défaut son premier contrôle.
 */
export function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  const heading = el.querySelector<HTMLElement>("h1, h2, h3, h4, h5, h6");
  const control = el.querySelector<HTMLElement>(
    "a[href], button, input, select, textarea"
  );
  const target = heading ?? control;
  if (!target) return;

  // Un titre n'est pas focalisable par défaut ; on le rend focalisable
  // uniquement pour ce cas d'usage (pas d'entrée dans l'ordre de tabulation).
  if (target === heading && !heading.hasAttribute("tabindex")) {
    heading.setAttribute("tabindex", "-1");
  }
  target.focus({ preventScroll: true });
}
