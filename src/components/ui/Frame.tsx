import Image from "next/image";
import { images, type ImageKey } from "@/content/images";

type FrameProps = {
  image: ImageKey;
  /** Aspect ratio utility, e.g. "aspect-[4/3]". Omit when the parent sizes the frame. */
  ratio?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Clip-path wipe on first view. */
  reveal?: boolean;
  /** Percentage drift while scrolling (desktop only). */
  parallax?: number;
  /** Object position override, e.g. "50% 30%". */
  position?: string;
  alt?: string;
};

/**
 * The single image treatment used across the site: square corners, no
 * shadow, a stone-toned placeholder, optional reveal and parallax.
 */
export function Frame({ image, ratio = "", sizes, className = "", priority, reveal, parallax, position, alt }: FrameProps) {
  const img = images[image];
  const pic = (
    <Image
      src={img.src}
      alt={alt ?? img.alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
      style={position ? { objectPosition: position } : undefined}
    />
  );
  return (
    <div className={`frame ${ratio} ${className}`} data-reveal-image={reveal ? "" : undefined}>
      {parallax ? (
        <div className="absolute inset-x-0 -bottom-[10%] -top-[10%]" data-parallax={parallax}>
          {pic}
        </div>
      ) : (
        pic
      )}
    </div>
  );
}
