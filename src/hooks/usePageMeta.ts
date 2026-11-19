import { useEffect } from "react";

/**
 * Met à jour le titre et la description de la page courante
 * (utile au SEO et au partage dans une application monopage).
 */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} — Singularity`
      : "Singularity-Informatique";

    if (description) {
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", description);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", document.title);
  }, [title, description]);
}
