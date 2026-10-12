import { gsap, prefersReducedMotion } from "./gsapSetup";

export function splitLines(element) {
  if (!element) return [];
  const text = element.textContent.trim();
  const words = text.split(/\s+/);
  element.innerHTML = words
    .map(
      (word) =>
        `<span class="reveal-line"><span>${word}&nbsp;</span></span>`
    )
    .join("");
  return element.querySelectorAll(".reveal-line > span");
}

export function animateHeadline(targets, opts = {}) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return null;

  if (prefersReducedMotion()) {
    gsap.set(els, { opacity: 1, y: 0 });
    return null;
  }

  return gsap.fromTo(
    els,
    { y: "110%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: opts.duration ?? 1,
      stagger: opts.stagger ?? 0.08,
      ease: opts.ease ?? "power3.out",
      delay: opts.delay ?? 0,
      scrollTrigger: opts.scrollTrigger,
    }
  );
}

export function fadeUp(targets, opts = {}) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return null;

  if (prefersReducedMotion()) {
    gsap.set(els, { opacity: 1, y: 0 });
    return null;
  }

  return gsap.fromTo(
    els,
    { opacity: 0, y: opts.y ?? 48 },
    {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? 0.9,
      stagger: opts.stagger ?? 0.12,
      ease: "power3.out",
      delay: opts.delay ?? 0,
      scrollTrigger: opts.scrollTrigger,
    }
  );
}
