import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta(
    "Page introuvable",
    "La page demandée n'existe pas ou a été déplacée."
  );

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-24">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-orange/8 blur-[130px]" />
      </div>
      <div className="container-x relative py-20 text-center">
        <p
          aria-hidden="true"
          className="ghost-num font-mono text-[7rem] leading-none font-bold select-none md:text-[10rem]"
        >
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-blanc sm:text-3xl">
          Cette page est restée hors tension.
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-texte2">
          La page que vous cherchez n'existe pas ou a été déplacée.
          Reprenons depuis l'accueil.
        </p>
        <Link to="/" className="btn btn-primary mt-9">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
