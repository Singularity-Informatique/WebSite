/* ---------------------------------------------------------------------------
 * Génération des variantes WebP des images du site.
 * ---------------------------------------------------------------------------
 * Usage : npm run optimize:images
 *
 * - Chaque JPEG de public/images est converti en WebP de même largeur.
 *   Le JPEG d'origine est conservé : il sert de repli aux navigateurs
 *   qui ne lisent pas le WebP (le composant <Picture> gère le <picture>).
 * - Le hero de l'accueil reçoit deux variantes supplémentaires (640 et
 *   960 px) pour le srcset responsive.
 * - L'emblème du logo est décliné en 96 et 192 px (affiché à 44-48 px,
 *   jusqu'à 3x de densité). Le PNG transparent reste le repli.
 *
 * Le script est idempotent : il réécrit les fichiers à chaque exécution.
 * Aucun fichier source n'est supprimé.
 * ------------------------------------------------------------------------- */

import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_DIR = path.join(ROOT, "public", "images");

/** Variantes de largeur du hero (le WebP pleine taille complète la série). */
const HERO_VARIANTS = [640, 960];
const HERO_BASENAME = "hero-datacenter";

/** Visuels de services déclinés en 640 et 960 px pour le srcset. */
const SERVICE_BASENAMES = [
  "service-diagnostic",
  "service-securite",
  "service-entretien",
  "service-sauvegarde",
  "service-installation",
  "service-gaming",
];
const SERVICE_VARIANTS = [640, 960];

/** Largeurs générées pour l'emblème du logo. */
const LOGO_VARIANTS = [96, 192];
const LOGO_BASENAME = "logo-singularity";

const QUALITY = 82;
const LOGO_QUALITY = 90;

const formatKb = (bytes) => `${(bytes / 1024).toFixed(1)} Ko`;

async function sizeOf(file) {
  const { size } = await stat(file);
  return size;
}

async function toWebp(source, target, width, quality) {
  let pipeline = sharp(source);
  if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
  }
  await pipeline
    .webp({ quality, effort: 5, smartSubsample: true })
    .toFile(target);

  const before = await sizeOf(source);
  const after = await sizeOf(target);
  const label = path.basename(target);
  const gain = Math.max(0, Math.round((1 - after / before) * 100));
  console.log(
    `  ${label.padEnd(32)} ${formatKb(before).padStart(9)} → ${formatKb(after).padStart(9)}  (-${gain} %)`
  );
}

async function main() {
  const entries = await readdir(IMAGES_DIR, { withFileTypes: true });
  const jpegs = entries
    .filter((entry) => entry.isFile() && /\.jpe?g$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  console.log(`Optimisation de ${jpegs.length} JPEG → WebP (qualité ${QUALITY})`);

  for (const name of jpegs) {
    const source = path.join(IMAGES_DIR, name);
    const base = name.replace(/\.jpe?g$/i, "");
    await toWebp(source, path.join(IMAGES_DIR, `${base}.webp`), null, QUALITY);
  }

  const heroSource = path.join(IMAGES_DIR, `${HERO_BASENAME}.jpg`);
  console.log(`\nVariantes responsive du hero :`);
  for (const width of HERO_VARIANTS) {
    await toWebp(
      heroSource,
      path.join(IMAGES_DIR, `${HERO_BASENAME}-${width}.webp`),
      width,
      QUALITY
    );
  }
  // La série est complétée par hero-datacenter.webp (largeur 1365),
  // déjà produite par la conversion générale ci-dessus.

  console.log(`\nVariantes responsive des visuels de services :`);
  for (const base of SERVICE_BASENAMES) {
    for (const width of SERVICE_VARIANTS) {
      await toWebp(
        path.join(IMAGES_DIR, `${base}.jpg`),
        path.join(IMAGES_DIR, `${base}-${width}.webp`),
        width,
        QUALITY
      );
    }
  }

  const logoSource = path.join(IMAGES_DIR, `${LOGO_BASENAME}.png`);
  console.log(`\nDéclinaisons du logo (qualité ${LOGO_QUALITY}) :`);
  for (const width of LOGO_VARIANTS) {
    await toWebp(
      logoSource,
      path.join(IMAGES_DIR, `${LOGO_BASENAME}-${width}.webp`),
      width,
      LOGO_QUALITY
    );
  }

  console.log("\nTerminé. Les fichiers d'origine sont conservés.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
