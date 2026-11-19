import type { ServiceBlock } from "@/data/services";
import { cn } from "@/utils/cn";

/**
 * Pastille d'état néon associée à une prestation : un point d'impulsion
 * lente (même cadence que l'indicateur « Connexion ») dans un badge
 * compact de couleur — vert (actif), jaune (en développement),
 * rouge (en révision). Discret, sans interférer avec l'identité ambrée.
 */
type StatusVariants = Record<
  NonNullable<ServiceBlock["status"]>,
  { label: string; color: string; glow: string; text: string }
>;

const STATUS: StatusVariants = {
  actif: {
    label: "Actif",
    color: "#00E676",
    glow: "rgba(0, 230, 118, 0.8), 0 0 14px 3px rgba(0, 230, 118, 0.35)",
    text: "#B8FFE0",
  },
  dev: {
    label: "En DEV",
    color: "#FAE04F",
    glow: "rgba(250, 224, 79, 0.8), 0 0 14px 3px rgba(250, 224, 79, 0.35)",
    text: "#FFF3B0",
  },
  revision: {
    label: "En Révision",
    color: "#FF4C4C",
    glow: "rgba(255, 76, 76, 0.8), 0 0 14px 3px rgba(255, 76, 76, 0.35)",
    text: "#FFD2D2",
  },
};

interface StatusPillProps {
  status: NonNullable<ServiceBlock["status"]>;
  className?: string;
}

export default function StatusPill({ status, className }: StatusPillProps) {
  const v = STATUS[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[9.5px] font-medium tracking-[0.16em] whitespace-nowrap uppercase",
        className
      )}
      style={{
        color: v.text,
        borderColor: v.color + "59",
        backgroundColor: v.color + "0d",
      }}
    >
      <span
        className="pulse-dot h-1.5 w-1.5 flex-none rounded-full"
        style={{
          backgroundColor: v.color,
          boxShadow: `0 0 6px 1px ${v.glow}`,
        }}
        aria-hidden="true"
      />
      {v.label}
    </span>
  );
}
