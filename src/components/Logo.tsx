import { useState } from "react";
import { Link } from "react-router-dom";
import Picture from "@/components/Picture";
import { cn } from "@/utils/cn";

/**
 * Emblème officiel Singularity (PNG détouré déposé dans
 * public/images/logo-singularity.png). Fond transparent : aucun blend
 * nécessaire, le motif se pose tel quel sur les surfaces du site.
 *
 * Tant que le fichier n'est pas présent, le repli affiche le symbole
 * géométrique historique (orbite « singularité ») — aucune rupture.
 */
const EMBLEM_SRC = "images/logo-singularity.png";

export function LogoMark({ className }: { className?: string }) {
  const [emblemReady, setEmblemReady] = useState(true);

  return (
    <span
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center md:h-12 md:w-12",
        className
      )}
      aria-hidden="true"
    >
      {emblemReady ? (
        <Picture
          src={EMBLEM_SRC}
          alt=""
          decoding="async"
          sizes="(min-width: 768px) 48px, 44px"
          sources={[
            {
              type: "image/webp",
              srcSet:
                "images/logo-singularity-96.webp 96w, images/logo-singularity-192.webp 192w",
            },
          ]}
          onError={() => setEmblemReady(false)}
          draggable={false}
          /* HALO ambiant permanent : détache l'emblème du fond sombre ;
             renforcé au survol. Zoom léger pour occuper toute la boîte. */
          className="scale-[1.06] drop-shadow-[0_0_10px_rgba(255,122,0,0.22)] transition-[scale,filter] duration-500 group-hover:scale-[1.12] group-hover:drop-shadow-[0_0_16px_rgba(255,122,0,0.55)]"
        />
      ) : (
        /* Repli : symbole géométrique — orbite embrasée vers la singularité */
        <svg
          viewBox="0 0 32 32"
          className="h-full w-full text-blanc"
          focusable="false"
        >
          <circle
            cx="16"
            cy="16"
            r="11.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.85"
          />
          <path
            d="M16 4.5 A11.5 11.5 0 0 1 27.5 16"
            fill="none"
            stroke="#FF7900"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="3.6" fill="#FF5A00" />
        </svg>
      )}
    </span>
  );
}

/** Logo typographique complet : emblème + nom. */
export default function Logo({
  markClassName,
  textClassName,
  linkClassName,
}: {
  /** Classes optionnelles pour surdimensionner l'emblème (ex. footer). */
  markClassName?: string;
  /** Classes optionnelles pour agrandir le nom « SINGULARITY » (ex. footer). */
  textClassName?: string;
  /** Classes optionnelles pour le conteneur (espacement, ex. footer). */
  linkClassName?: string;
}) {
  return (
    <Link
      to="/"
      className={cn("group inline-flex items-center gap-3", linkClassName)}
      aria-label="Singularity — Retour à l'accueil"
    >
      <LogoMark className={markClassName} />
      <span
        className={cn(
          "font-display text-base font-semibold tracking-[0.24em] text-blanc",
          textClassName
        )}
      >
        SINGULARITY
      </span>
    </Link>
  );
}
