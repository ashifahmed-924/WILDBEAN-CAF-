import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import Header from "./Header";
import AnimatedButton from "../ui/AnimatedButton";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import { mouseParallax } from "../animations/parallax";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { gsap } = registerGsap();

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const bg = root.querySelector("[data-hero-bg]");
      const cup = root.querySelector("[data-hero-cup]");
      const lines = root.querySelectorAll("[data-hero-line]");
      const ctas = root.querySelectorAll("[data-hero-cta]");
      const badge = root.querySelector("[data-hero-badge]");
      const side = root.querySelector("[data-hero-side]");
      const cue = root.querySelector("[data-scroll-cue]");
      const header = document.querySelector("[data-header]");

      if (prefersReducedMotion()) {
        gsap.set([bg, cup, lines, ctas, badge, side, cue, header], {
          clearProps: "all",
          opacity: 1,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.set(bg, { scale: 1.15 });
      gsap.set(cup, { y: 80, opacity: 0 });
      gsap.set(lines, { y: 80, opacity: 0 });
      gsap.set(ctas, { y: 30, opacity: 0 });
      gsap.set(badge, { opacity: 0, rotate: -12 });
      gsap.set(side, { opacity: 0, x: -24 });
      gsap.set(cue, { opacity: 0 });
      if (header) gsap.set(header, { y: -40, opacity: 0 });

      tl.to(bg, { scale: 1, duration: 2.2, ease: "power2.out" })
        .to(header, { y: 0, opacity: 1, duration: 0.8 }, 0.35)
        .to(side, { opacity: 1, x: 0, duration: 0.9 }, 0.4)
        .to(lines, { y: 0, opacity: 1, stagger: 0.12, duration: 1 }, 0.45)
        .to(cup, { y: 0, opacity: 1, duration: 1.1 }, 0.7)
        .to(ctas, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7 }, 1)
        .to(badge, { opacity: 1, duration: 0.8 }, 1.1)
        .to(cue, { opacity: 1, duration: 0.6 }, 1.4);

      gsap.to(badge, {
        rotate: "+=360",
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      const cleanup = mouseParallax(root, [
        { el: cup, strength: 18 },
        { el: badge, strength: -10 },
        { el: side, strength: 8 },
      ]);

      return () => cleanup?.();
    },
    { scope: sectionRef }
  );

  return (
    <section id="home" className={styles.hero} ref={sectionRef}>
      <Header />
      <div className={styles.bg} data-hero-bg>
        <img
          src="/images/hero/hero-coffee.jpg"
          alt="Fresh coffee with latte art"
          fetchPriority="high"
        />
        <div className={styles.overlay} />
      </div>

      <aside className={styles.sideRail} data-hero-side aria-hidden="true">
        <span className={styles.sideLine} />
        <p className={styles.sideText}>Dandenong South</p>
        <div className={styles.sideThumb}>
          <img src="/images/menu/croissant.jpg" alt="" />
        </div>
        <p className={styles.sideMeta}>Fresh daily</p>
      </aside>

      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow} data-hero-line>
          WILDBEAN CAFÉ • DANDENONG SOUTH
        </p>
        <h1 className={styles.title}>
          <span data-hero-line>FRESH COFFEE.</span>
          <span data-hero-line>GOOD MOMENTS.</span>
        </h1>
        <p className={styles.copy} data-hero-line>
          Your favourite coffee stop for a quick break, a fresh bite and something
          delicious on the go.
        </p>
        <div className={styles.ctas}>
          <span data-hero-cta>
            <AnimatedButton href="#menu">Explore the menu</AnimatedButton>
          </span>
          <span data-hero-cta>
            <AnimatedButton href="#find-us" variant="ghost">
              Find our cafe
            </AnimatedButton>
          </span>
        </div>
      </div>

      <div className={styles.cup} data-hero-cup>
        <img src="/images/hero/hero-cup.png" alt="Barista preparing espresso" />
      </div>

      <div className={styles.badge} data-hero-badge aria-hidden>
        <svg viewBox="0 0 200 200">
          <defs>
            <path id="circlePath" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
          </defs>
          <text>
            <textPath href="#circlePath" startOffset="0%">
              WILDBEAN CAFÉ • SIP • SNACK • GO •
            </textPath>
          </text>
        </svg>
      </div>

      <a href="#highlights" className={styles.scrollCue} data-scroll-cue aria-label="Scroll to highlights">
        <span>Scroll</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}
