import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SectionHeading from "../ui/SectionHeading";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import { gentleParallax } from "../animations/parallax";
import styles from "./CoffeeStory.module.css";

export default function CoffeeStory() {
  const ref = useRef(null);
  const { gsap } = registerGsap();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;

      gsap.from(root.querySelectorAll("[data-story]"), {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });

      gentleParallax(root.querySelector("[data-main]"), { yPercent: 10 });
      gentleParallax(root.querySelector("[data-side]"), { yPercent: -12 });

      gsap.to(root.querySelector("[data-spin]"), {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: ref }
  );

  return (
    <section className={`section section--ocean ${styles.section}`} ref={ref}>
      <p className={styles.outline} aria-hidden data-story>
        RITUAL
      </p>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy} data-copy>
          <SectionHeading eyebrow="The coffee ritual" title={"YOUR DAILY\nCOFFEE FIX."} />
          <p data-story>
            Barista-made coffee with a rich, full-bodied roast — crafted for the pause
            between destinations at Dandenong South.
          </p>
          <div className={styles.badge} data-spin data-story aria-hidden>
            EST. FOR EVERYDAY
          </div>
        </div>
        <div className={styles.visuals}>
          <div className={styles.main} data-main data-story>
            <img
              src="/images/coffee/ritual-main.jpg"
              alt="Premium coffee cup close-up"
              loading="lazy"
            />
          </div>
          <div className={styles.side} data-side data-story>
            <img
              src="/images/coffee/latte-art.jpg"
              alt="Latte art detail"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
