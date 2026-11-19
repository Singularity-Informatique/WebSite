/* ---------------------------------------------------------------------------
 * DIMENSIONS INTRINSÈQUES DES IMAGES
 * ---------------------------------------------------------------------------
 * Le composant <Picture> les lit depuis le chemin source pour poser
 * width/height sur la balise <img> : le navigateur réserve ainsi la place
 * avant le chargement et évite les décalages de mise en page (CLS).
 *
 * Toute nouvelle image ajoutée dans public/images doit être déclarée ici.
 * ------------------------------------------------------------------------- */

export interface ImageDimensions {
  width: number;
  height: number;
}

export const IMAGE_DIMENSIONS: Record<string, ImageDimensions> = {
  "images/contact-desk.jpg": { width: 736, height: 552 },
  "images/fibers.jpg": { width: 1280, height: 731 },
  "images/hero-datacenter.jpg": { width: 1365, height: 768 },
  "images/logo-singularity.png": { width: 300, height: 284 },
  "images/reseaux.jpg": { width: 1280, height: 485 },
  "images/Rubrique-01.jpg": { width: 960, height: 723 },
  "images/Rubrique-03.jpg": { width: 1021, height: 766 },
  "images/service-diagnostic.jpg": { width: 1280, height: 717 },
  "images/service-entretien.jpg": { width: 1100, height: 829 },
  "images/service-gaming.jpg": { width: 1209, height: 955 },
  "images/service-installation.jpg": { width: 1104, height: 944 },
  "images/service-sauvegarde.jpg": { width: 1248, height: 832 },
  "images/service-securite.jpg": { width: 1178, height: 832 },
};

/** Chemin de la variante WebP d'une image source (même nom, autre extension). */
export function webpPath(src: string): string {
  return src.replace(/\.(jpe?g|png)$/i, ".webp");
}

/* ---------------------------------------------------------------------------
 * VARIANTES RESPONSIVE DES VISUELS DE SERVICES
 * ---------------------------------------------------------------------------
 * Les cartes d'accueil affichent ces images entre ~300 et ~930 px selon
 * l'écran : une seule définition de 1 100-1 280 px faisait télécharger
 * 2 à 3 fois les pixels nécessaires. Les variantes 640 et 960 sont
 * générées par `npm run optimize:images` (qualité 82, comme les autres).
 *
 * La liste est explicite : un srcset n'est proposé que pour les images
 * dont les fichiers existent réellement, pour ne jamais pointer vers un
 * fichier absent.
 * ------------------------------------------------------------------------- */

const SERVICE_VARIANTS: Record<string, readonly number[]> = {
  "images/service-diagnostic.jpg": [640, 960],
  "images/service-securite.jpg": [640, 960],
  "images/service-entretien.jpg": [640, 960],
  "images/service-sauvegarde.jpg": [640, 960],
  "images/service-installation.jpg": [640, 960],
  "images/service-gaming.jpg": [640, 960],
};

/**
 * srcset WebP d'un visuel de service : variantes 640/960 puis fichier
 * pleine taille, qui reste utile aux très grands écrans et aux densités 2x.
 * Renvoie `undefined` pour les images sans variantes (aucun srcset).
 */
export function serviceSrcSet(src: string): string | undefined {
  const widths = SERVICE_VARIANTS[src];
  if (!widths) return undefined;

  const base = src.replace(/\.(jpe?g|png)$/i, "");
  const fullWidth = IMAGE_DIMENSIONS[src]?.width;
  const parts = widths.map((width) => `${base}-${width}.webp ${width}w`);
  if (fullWidth) parts.push(`${webpPath(src)} ${fullWidth}w`);
  return parts.join(", ");
}
