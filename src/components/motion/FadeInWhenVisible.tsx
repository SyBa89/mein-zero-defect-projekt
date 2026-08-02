'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';
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
 * ✅ ZERO-DEFECT: Universelle Scroll-Reveal Komponente
 *
 * Features:
 * - Respektiert prefers-reduced-motion (Accessibility)
 * - GPU-acceleriert via transforms (performant)
 * - Once-Trigger (animiert nur beim ersten Sichtbarwerden)
 * - Konfigurierbare Richtung und Verzögerung
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

  // ✅ Bei Reduced Motion: Sofort sichtbar, keine Animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // ✅ Richtungs-Varianten für elegante Bewegungsrichtungen
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
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as const, // smooth cubic-bezier
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ✅ ZERO-DEFECT: Stagger Container für Listen/Grids
 *
 * Nutze diese Komponente als Wrapper um eine Liste,
 * damit die Kind-Elemente nacheinander erscheinen.
 * Die Kind-Varianten werden in StaggerItem definiert.
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

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ✅ ZERO-DEFECT: Stagger Item - nutze dies als Kind von StaggerContainer
 */
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ✅ ZERO-DEFECT: Hover-Lift Komponente für Cards
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

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{
        y: liftAmount,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
