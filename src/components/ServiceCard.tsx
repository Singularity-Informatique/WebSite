import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";
import Picture from "@/components/Picture";
import Reveal from "@/components/Reveal";
import { serviceSrcSet } from "@/data/imageDimensions";
import { cn } from "@/utils/cn";

interface ServiceCardProps {
  service: Service;
  delay?: number;
}

/** Carte de service pour la grille asymétrique de la page d'accueil.
 *  Les services mis en avant (carte pleine largeur) basculent en
 *  variante horizontale : visuel à gauche, contenu à droite.
 *  Si le service fournit une vidéo ambiante, elle remplace l'image :
 *  muette, en boucle, avec lecture différée à l'entrée dans le viewport. */
export default function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
  const Icon = service.icon;
  const isWide = service.cardSpan.includes("lg:col-span-12");
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Largeur réellement occupée par le visuel, communiquée au navigateur
     pour qu'il choisisse la variante adaptée (640, 960 ou pleine taille).
     La grille compte 12 colonnes ; le visuel en occupe ~90 % une fois
     déduites les gouttières et les marges du conteneur. */
  const span = Number(service.cardSpan.match(/lg:col-span-(\d+)/)?.[1] ?? 6);
  /* À partir de 768 px, la grille passe à deux colonnes : les cartes qui
     n'occupent pas encore toute la largeur n'en prennent que la moitié. */
  const halfAtMd = !service.cardSpan.includes("md:col-span-2");
  const imageSizes = [
    `(min-width: 1024px) ${Math.round(span * 7.5)}vw`,
    ...(halfAtMd ? ["(min-width: 768px) 45vw"] : []),
    "100vw",
  ].join(", ");
  const imageSrcSet = serviceSrcSet(service.image);

  /* Lecture différée : la vidéo ne démarre que lorsque la carte devient
     visible (IntersectionObserver), et se met en pause hors écran.
     L'auto-play classique démarrerait la lecture même hors viewport. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, [service.slug]);

  return (
    <Reveal delay={delay} className={cn("h-full", service.cardSpan)}>
      <Link
        to={`/services/${service.slug}`}
        className={cn(
          "group flex h-full flex-col border border-bordure bg-graphite/70 transition-all duration-500 neon-hover hover:-translate-y-1 hover:bg-graphite",
          isWide && "lg:flex-row"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            service.cardAspect ?? "aspect-video",
            isWide && "lg:aspect-auto lg:w-1/2 lg:self-stretch"
          )}
        >
          {service.video ? (
            <video
              ref={videoRef}
              src={service.video}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          ) : (
            <Picture
              src={service.image}
              alt={service.imageAlt}
              loading="lazy"
              sizes={imageSizes}
              sources={
                imageSrcSet
                  ? [{ type: "image/webp", srcSet: imageSrcSet }]
                  : undefined
              }
              style={{ objectPosition: service.imageFocus ?? undefined }}
              className={cn(
                "h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]",
                service.imageFit === "contain" ? "object-contain" : "object-cover"
              )}
            />
          )}
          <span
            aria-hidden="true"
            className="absolute top-3 right-4 font-mono text-4xl font-bold text-blanc/15 transition-colors duration-500 group-hover:text-blanc/25"
          >
            {service.number}
          </span>
          <span className="absolute top-4 left-4 inline-flex h-10 w-10 items-center justify-center border border-blanc/15 bg-noir/70 text-ambre backdrop-blur-sm">
            <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
          </span>
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col p-6",
            isWide && "lg:justify-center lg:p-10 xl:p-14"
          )}
        >
          <h3 className="font-display text-xl font-semibold text-blanc">
            {service.name}
          </h3>
          {/* Détail graphique distinctif : filet à l'accent du service */}
          <span
            aria-hidden="true"
            className="mt-4 block h-px w-12"
            style={{
              backgroundImage: `linear-gradient(90deg, ${service.accent}, transparent)`,
            }}
          />
          <p className="mt-4 flex-1 text-sm leading-relaxed text-texte2">
            {service.description}
          </p>
          <span className="link-arrow mt-6">
            Découvrir le service
            <ArrowRight className="icon h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
