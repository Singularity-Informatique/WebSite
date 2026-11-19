import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Picture from "@/components/Picture";
import Reveal from "@/components/Reveal";

interface CtaBandProps {
  title?: string;
  text?: string;
  label?: string;
  to?: string;
}

/** Bande d'appel à l'action finale, partagée entre les pages. */
export default function CtaBand({
  title = "Un Besoin Informatique ?",
  text = "Expliquez votre situation : prenons le temps d'identifier la solution la plus adaptée.",
  label = "Contacter Singularity",
  to = "/contact",
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden border-y border-bordure">
      <Picture
        src="images/reseaux.jpg"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-noir/65" />
      <div className="absolute inset-0 grid-overlay opacity-40" aria-hidden="true" />
      <div
        className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange/15 blur-[110px]"
        aria-hidden="true"
      />
      <div className="container-x relative py-20 text-center md:py-28">
        <Reveal>
          <p className="kicker justify-center">Parlons-en</p>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold tracking-normal text-blanc sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-texte2 lg:max-w-none">
            {text}
          </p>
          <div className="mt-9">
            <Link to={to} className="btn btn-primary">
              {label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
