import Image from "next/image";
import directusImageLoader from "@/lib/directus-image-loader";

interface DirectusImageProps {
  uuid: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function DirectusImage({
  uuid,
  alt,
  width,
  height,
  fill,
  className,
  priority = false,
  sizes,
}: DirectusImageProps) {
  if (fill) {
    return (
      <Image
        loader={directusImageLoader}
        src={uuid}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || "100vw"}
      />
    );
  }

  return (
    <Image
      loader={directusImageLoader}
      src={uuid}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
