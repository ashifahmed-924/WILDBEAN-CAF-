import { gsap, prefersReducedMotion } from "./gsapSetup";

export function clipReveal(targets, opts = {}) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return null;

  if (prefersReducedMotion()) {
    gsap.set(els, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 });
    gsap.set(
      els.map((el) => el.querySelector("img")).filter(Boolean),
      { scale: 1 }
    );
    return null;
  }

  const imgs = els.map((el) => el.querySelector("img")).filter(Boolean);

  gsap.set(els, { clipPath: "inset(12% 12% 12% 12%)" });
  gsap.set(imgs, { scale: 1.2 });

  return gsap
    .timeline({
      scrollTrigger: opts.scrollTrigger,
      delay: opts.delay ?? 0,
    })
    .to(els, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: opts.duration ?? 1.2,
      stagger: opts.stagger ?? 0.15,
      ease: "power3.inOut",
    })
    .to(
      imgs,
      {
        scale: 1,
        duration: opts.duration ?? 1.2,
        stagger: opts.stagger ?? 0.15,
        ease: "power2.out",
      },
      "<"
    );
}

export function hoverZoom(el, scale = 1.08) {
  if (!el || prefersReducedMotion()) return () => {};
  const img = el.querySelector("img") || el;
  const enter = () =>
    gsap.to(img, { scale, duration: 0.6, ease: "power2.out" });
  const leave = () =>
    gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
  el.addEventListener("mouseenter", enter);
  el.addEventListener("mouseleave", leave);
  return () => {
    el.removeEventListener("mouseenter", enter);
    el.removeEventListener("mouseleave", leave);
  };
}
