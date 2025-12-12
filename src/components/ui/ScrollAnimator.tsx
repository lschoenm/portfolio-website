import { ReactNode, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface ScrollAnimatorProps {
  children: ReactNode;
  className?: string;
  animation?: string;
}

export function ScrollAnimator({
  children,
  className,
  animation = "animate-fade-up",
}: ScrollAnimatorProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-opacity duration-1000 ease-in-out",
        inView ? `opacity-100 ${animation}` : "opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
