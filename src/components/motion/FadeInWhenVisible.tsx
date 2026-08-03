'use client';

import { m, useReducedMotion, Variants, LazyMotion, domAnimation } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
}

/**
 * ✅ ZERO-DEFECT MAXIMUM: Universelle Scroll-Reveal Komponente
 *
 * Premium Features:
 * - ✅ LazyMotion (reduziert Bundle um ~30 KiB)
 * - ✅ `m` statt `motion` (strict mode für echtes Tree-Shaking)
 * - ✅ Nur GPU-composited Properties (transform, opacity)
 * - ✅ will-change: transform, opacity (Browser-Optimierung)
 * - ✅ SSR-sicher durch konsistente DOM-Struktur
 * - ✅ Accessibility (prefers-reduced-motion)
 */
export default function FadeInWhenVisible({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className = '',
  once = true,
}: FadeInWhenVisibleProps) {
  const prefersReducedMotion = useReducedMotion();

  const directionOffset = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: {},
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directionOffset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.2 }}
        variants={variants}
        className={className}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

/**
 * ✅ ZERO-DEFECT MAXIMUM: Stagger Container
 */
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className={className}
        style={{ willChange: 'opacity' }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

/**
 * ✅ ZERO-DEFECT MAXIMUM: Stagger Item
 */
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: prefersReducedMotion ? 0 : 0.5,
              ease: [0.25, 0.1, 0.25, 1] as const,
            },
          },
        }}
        className={className}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

/**
 * ✅ ZERO-DEFECT MAXIMUM: Hover-Lift
 */
export function HoverLift({
  children,
  className = '',
  liftAmount = -4,
}: {
  children: ReactNode;
  className?: string;
  liftAmount?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        whileHover={
          prefersReducedMotion
            ? {}
            : {
                y: liftAmount,
                transition: { duration: 0.2, ease: 'easeOut' },
              }
        }
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        className={className}
        style={{ willChange: 'transform' }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
