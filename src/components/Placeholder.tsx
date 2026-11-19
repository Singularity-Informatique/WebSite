import { CircleAlert } from "lucide-react";

/**
 * Emplacement d'information volontairement non renseignée.
 * Aucune coordonnée, certification ou référence n'est inventée :
 * les champs manquants sont signalés ici et documentés dans le README.
 */
export default function Placeholder({ label }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-dashed border-ambre2/50 bg-ambre2/10 px-2.5 py-1 font-mono text-[11px] tracking-wider text-ambre2/90 uppercase">
      <CircleAlert className="h-3 w-3" aria-hidden="true" />
      {label ?? "À compléter"}
    </span>
  );
}
