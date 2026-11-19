import type { CSSProperties } from "react";
import { IMAGE_DIMENSIONS, webpPath } from "@/data/imageDimensions";

/** Source optionnelle du <picture> (WebP, variantes responsive…). */
export interface PictureSource {
  srcSet: string;
  type?: string;
  media?: string;
  sizes?: string;
}

interface PictureProps {
  /** Image de repli (JPEG ou PNG), chemin relatif à public/. */
  src: string;
  alt: string;
  /** Dimensions intrinsèques : lues dans imageDimensions.ts si omises. */
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  fetchPriority?: "high" | "low" | "auto";
  draggable?: boolean;
  /** Attribut sizes, communiqué à la source et à l'image. */
  sizes?: string;
  /** Sources prioritaires ; par défaut, la variante WebP du même nom. */
  sources?: PictureSource[];
  onError?: () => void;
}

/**
 * Image du site : <picture> avec WebP prioritaire et repli JPEG/PNG.
 *
 * Le <picture> porte `contents` (display: contents) : il n'introduit aucune
 * boîte dans la mise en page, donc les classes de l'image (dimensions,
 * object-fit, positionnement absolu) continuent de s'appliquer exactement
 * comme avant. Les dimensions intrinsèques sont posées sur <img> pour
 * réserver la place et éviter les décalages de mise en page.
 */
export default function Picture({
  src,
  alt,
  width,
  height,
  className,
  style,
  loading,
  decoding = "async",
  fetchPriority,
  draggable,
  sizes,
  sources,
  onError,
}: PictureProps) {
  const dimensions = IMAGE_DIMENSIONS[src];
  const resolvedSources: PictureSource[] = sources ?? [
    { srcSet: webpPath(src), type: "image/webp" },
  ];

  return (
    <picture className="contents">
      {resolvedSources.map((source) => (
        <source
          key={`${source.type ?? "image/webp"}-${source.srcSet}`}
          srcSet={source.srcSet}
          type={source.type ?? "image/webp"}
          media={source.media}
          sizes={source.sizes ?? sizes}
        />
      ))}
      <img
        src={src}
        alt={alt}
        width={width ?? dimensions?.width}
        height={height ?? dimensions?.height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        draggable={draggable}
        sizes={sizes}
        style={style}
        className={className}
        onError={onError}
      />
    </picture>
  );
}
