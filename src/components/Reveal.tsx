import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Décalage d'apparition en millisecondes */
  delay?: number;
}

/**
 * Enveloppe d'apparition au défilement (IntersectionObserver).
 * Robustesse mobile : certains navigateurs manquent un rappel de
 * l'observateur (barre d'URL qui se replie, zoom, rotation…), laissant
 * l'élément invisible jusqu'à un redimensionnement. D'où deux filets :
 * une détection immédiate au montage et un contrôle au défilement,
 * en plus de l'IntersectionObserver. Le contenu reste accessible si les
 * animations sont désactivées (« prefers-reduced-motion »).
 */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    /** L'élément est entré dans le champ (avec une petite réserve basse). */
    const estEntree = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - 48 && rect.bottom > 0;
    };

    const reveler = () => {
      setVisible(true);
      nettoyer();
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveler();
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -48px 0px" }
    );

    const auDefilement = () => {
      if (estEntree()) reveler();
    };

    const nettoyer = () => {
      io.disconnect();
      window.removeEventListener("scroll", auDefilement, true);
    };

    // Déjà dans le champ au montage (ou remonté au-dessus) : visible tout de suite.
    if (estEntree()) {
      setVisible(true);
      return;
    }

    io.observe(el);
    window.addEventListener("scroll", auDefilement, { passive: true, capture: true });
    return nettoyer;
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </div>
  );
}
