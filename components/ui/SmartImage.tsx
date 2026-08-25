"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { displayImageSrc, isRemoteImage } from "@/lib/media";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  objectPosition?: string;
  fit?: "cover" | "contain";
  unoptimized?: boolean;
};

export function SmartImage({
  src,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  priority,
  fill = true,
  width,
  height,
  objectPosition = "center",
  fit = "cover",
  unoptimized = false,
}: Props) {
  const [failed, setFailed] = useState(false);
  const imageSrc = displayImageSrc(src);
  const shouldSkipOptimization = unoptimized || isRemoteImage(imageSrc);

  if (failed) {
    return (
      <div className={clsx("flex items-center justify-center bg-soft text-muted", className)}>
        <span className="kicker">Image unavailable</span>
      </div>
    );
  }

  if (fill) {
    return (
      <div className={clsx("relative overflow-hidden bg-soft", className)}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={shouldSkipOptimization}
          className={clsx(fit === "contain" ? "object-contain" : "object-cover", imageClassName)}
          style={{ objectPosition }}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 1200}
      height={height || 800}
      sizes={sizes}
      priority={priority}
        unoptimized={shouldSkipOptimization}
      className={clsx(imageClassName, className)}
      style={{ objectPosition }}
      onError={() => setFailed(true)}
    />
  );
}
