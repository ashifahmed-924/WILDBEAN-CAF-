import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsapSetup";

export function gentleParallax(target, opts = {}) {
  if (!target || prefersReducedMotion()) return null;
  if (window.matchMedia("(max-width: 768px)").matches) return null;

  return gsap.to(target, {
    yPercent: opts.yPercent ?? 12,
    ease: "none",
    scrollTrigger: {
      trigger: opts.trigger || target,
      start: "top bottom",
      end: "bottom top",
      scrub: opts.scrub ?? true,
      ...opts.scrollTrigger,
    },
  });
}

export function mouseParallax(container, layers) {
  if (!container || prefersReducedMotion()) return () => {};
  if (window.matchMedia("(max-width: 1024px)").matches) return () => {};

  const onMove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    layers.forEach(({ el, strength = 20 }) => {
      if (!el) return;
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  };

  container.addEventListener("mousemove", onMove);
  return () => container.removeEventListener("mousemove", onMove);
}

export function refreshScroll() {
  ScrollTrigger.refresh();
}
