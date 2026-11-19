/* ---------------------------------------------------------------------------
 * CONFIGURATION DU SITE — SINGULARITY
 * ---------------------------------------------------------------------------
 * Toutes les informations à compléter avant la publication sont
 * centralisées dans ce fichier. Consultez le README (section
 * « Informations à compléter ») pour la liste exhaustive.
 * ------------------------------------------------------------------------- */

export interface SiteConfig {
  name: string;
  signature: string;
  email: string;
  phone: string;
  zone: string;
  hours: string;
}

export const SITE: SiteConfig = {
  name: "Singularity-informatique",
  signature: "Un Numérique Responsable. L'éthique Comme Fondation. La Sécurité Par Conception.",

  /* Adresse réelle, utilisée par le lien mailto: et le formulaire de
   * contact. Le badge « À compléter » du pied de page ne s'affiche que
   * si la valeur se termine par « .example » (repli de maquette) :
   * voir isEmailPlaceholder plus bas. */
  email: "contact@singularity-informatique.fr",

  /* Laisser vide : la mention « À compléter » s'affiche. */
  phone: "06 26 54 42 63",
  zone: "Vendée Ouest & Finistère Sud",
  hours: "Intervention sur demande",
} as const;

/** Indique si l'adresse e-mail est encore l'espace réservé. */
export const isEmailPlaceholder = SITE.email.endsWith(".example");
