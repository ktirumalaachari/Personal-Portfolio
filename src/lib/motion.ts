import type { Transition } from "framer-motion";

/**
 * Tactile spring with slight overshoot for cards, pills, badges, and modals.
 */
export const BOUNCE_SPRING: Transition = {
  type: "spring",
  stiffness: 310,
  damping: 19,
  mass: 0.78,
};

/**
 * Crisp responsive spring for buttons, icons, underlines, and indicator controls.
 */
export const SNAPPY_SPRING: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 24,
  mass: 0.65,
};

/**
 * Balanced spring for large editorial panels and section transitions.
 */
export const SMOOTH_SPRING: Transition = {
  type: "spring",
  stiffness: 235,
  damping: 23,
  mass: 0.85,
};

/**
 * Fast, compositor-friendly sweep easing for full-width section banner reveals.
 */
export const BANNER_EASE = [0.22, 1, 0.36, 1] as const;

export function sectionBannerTransition(delay = 0): Transition {
  return {
    duration: 0.65,
    delay,
    ease: BANNER_EASE,
  };
}
