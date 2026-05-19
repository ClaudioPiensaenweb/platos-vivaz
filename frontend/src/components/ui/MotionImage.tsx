"use client";

import { motion } from "framer-motion";
import Image, { type ImageProps } from "next/image";

interface MotionImageProps extends Omit<ImageProps, "ref"> {
  layoutId?: string;
  /** CSS view-transition-name for cross-page morph */
  viewTransitionName?: string;
}

export default function MotionImage({
  layoutId,
  viewTransitionName,
  className,
  ...props
}: MotionImageProps) {
  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={className}
      style={{
        position: props.fill ? "absolute" : "relative",
        inset: props.fill ? 0 : undefined,
        viewTransitionName: viewTransitionName || undefined,
      }}
    >
      <Image {...props} className={className} unoptimized />
    </motion.div>
  );
}
