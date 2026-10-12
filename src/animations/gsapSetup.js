import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

let registered = false;

export function registerGsap() {
  if (registered) return { gsap, ScrollTrigger, Flip };
  gsap.registerPlugin(ScrollTrigger, Flip);
  registered = true;
  return { gsap, ScrollTrigger, Flip };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, Flip };
