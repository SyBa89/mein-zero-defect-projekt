'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
}

/**
 * ✅ ZERO-DEFECT MAXIMUM: Universelle Scroll-Reveal Komponente (CSS/IO-Version)
 *
 * Premium Features:
 * - ✅ Native IntersectionObserver (kein JS-Framework)
 * - ✅ CSS-Transitions (GPU-composited: transform, opacity)
 * - ✅ will-change: transform, opacity (Browser-Optimierung)
 * - ✅ SSR-sicher durch konsistente DOM-Struktur
 * - ✅ Accessibility (prefers-reduced-motion via CSS Media Query)
 * - ✅ ~34 KB Bundle-Reduktion (kein framer-motion)
 */
export default function FadeInWhenVisible({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className = '',
  once = true,
}: FadeInWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [once]);

  const directionStyles = {
    up: 'translate-y-[30px]',
    down: 'translate-y-[-30px]',
    left: 'translate-x-[30px]',
    right: 'translate-x-[-30px]',
    none: '',
  };

  return (
    <div
      ref={ref}
      className={`${className} motion-fade-in ${isVisible ? 'motion-visible' : 'motion-hidden'} ${directionStyles[direction]}`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

/**
 * ✅ ZERO-DEFECT MAXIMUM: Stagger Container (CSS/IO-Version)
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
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} motion-stagger-container ${isVisible ? 'motion-visible' : 'motion-hidden'}`}
      style={{
        ['--stagger-delay' as any]: `${staggerDelay}s`,
        willChange: 'opacity',
      }}
    >
      {children}
    </div>
  );
}

/**
 * ✅ ZERO-DEFECT MAXIMUM: Stagger Item (CSS/IO-Version)
 */
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className} motion-stagger-item`}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
}

/**
 * ✅ ZERO-DEFECT MAXIMUM: Hover-Lift (CSS/IO-Version)
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
  return (
    <div
      className={`${className} motion-hover-lift`}
      style={{
        ['--lift-amount' as any]: `${liftAmount}px`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}