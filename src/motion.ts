import type { Variants } from 'motion/react';

/**
 * Shared motion system.
 * One easing curve + a small set of reusable variants so every section
 * reveals with the same rhythm. All gated by MotionConfig reducedMotion="user"
 * (in App.tsx), so users with OS "reduce motion" get instant, static content.
 */

// Smooth, slightly-overshooting ease-out (expo-style). Cinematic, not bouncy.
export const EASE = [0.22, 1, 0.36, 1] as const;

// Shared viewport trigger — reveal a touch before the element is fully in frame.
export const viewport = { once: true, margin: '-80px' } as const;

// Single element rising into place.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// Subtler rise for smaller / secondary elements.
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// Plain fade (no movement) — for large display headings where motion would feel heavy.
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

// Parent that staggers its children. Pair with child variants (fadeUp / fadeUpSm).
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// Faster stagger for longer lists (services, projects).
export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
