import type { Prerequisite } from "@/data/services";
import { cn } from "@/utils/cn";

interface PrerequisitesTerminalProps {
  /** Référence de la prestation, rappelée dans la ligne de commande. */
  reference: string;
  items: Prerequisite[];
  className?: string;
}

/**
 * Fenêtre de terminal façon macOS listant les prérequis à réunir avant
 * l'intervention. Le contenu reste du texte réel (lisible et indexable) :
 * la barre de titre et les pastilles ne sont qu'un habillage.
 */
export default function PrerequisitesTerminal({
  reference,
  items,
  className,
}: PrerequisitesTerminalProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[10px] border border-[#2b2931] bg-[#08070a]",
        className
      )}
      style={{
        boxShadow:
          "0 1px 0 rgba(255, 255, 255, 0.05) inset, 0 34px 70px -34px rgba(0, 0, 0, 0.95), 0 0 46px -26px rgba(255, 122, 0, 0.35)",
      }}
    >
      {/* Barre de titre macOS */}
      <div className="grid h-10 grid-cols-[1fr_auto_1fr] items-center border-b border-[#26242b] bg-linear-to-b from-[#1b1a20] to-[#131217] px-3.5">
        <div className="flex justify-self-start gap-2" aria-hidden="true">
          {[
            "radial-gradient(circle at 34% 30%, #ff8a80, #ff5f57 46%, #e0443e)",
            "radial-gradient(circle at 34% 30%, #ffe08a, #febc2e 46%, #dea123)",
            "radial-gradient(circle at 34% 30%, #a8f0a0, #28c840 46%, #1aab29)",
          ].map((background) => (
            <span
              key={background}
              className="h-[11px] w-[11px] rounded-full"
              style={{
                background,
                boxShadow:
                  "0 1px 1px rgba(0, 0, 0, 0.5) inset, 0 0 0 0.5px rgba(0, 0, 0, 0.28)",
              }}
            />
          ))}
        </div>
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </div>

      {/* Session */}
      <div className="relative z-10 px-5 py-5 font-mono text-[12.5px] leading-[1.75] text-blanc">
        <p className="m-0">
          <span className="mr-2 font-semibold text-orange2" aria-hidden="true">
            ❯
          </span>
          Vérification des prérequis avant intervention <span className="text-ambre">--ref</span> {reference}
        </p>

        <ul className="m-0 mt-4 grid list-none gap-3.5 p-0">
          {items.map((item) => (
            <li
              key={item.label}
              className="grid grid-cols-[14px_1fr] items-start gap-2.5"
            >
              <span
                className="text-[11px] leading-[1.9] text-ambre"
                aria-hidden="true"
              >
                ▸
              </span>
              <span>
                <span className="block text-[12.5px] font-medium text-blanc">
                  {item.label}
                </span>
                <span className="mt-px block text-[11.5px] leading-[1.65] text-[#8f8b95]">
                  {item.detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Balayage discret de l'écran */}
      <div
        className="pointer-events-none absolute inset-x-0 top-10 bottom-0 z-20 opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.014) 0 1px, transparent 1px 3px)",
        }}
      />
    </div>
  );
}
