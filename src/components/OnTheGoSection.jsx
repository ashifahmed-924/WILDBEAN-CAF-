import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { business } from "../data/business";
import AnimatedButton from "../ui/AnimatedButton";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./OnTheGoSection.module.css";

export default function OnTheGoSection() {
  const ref = useRef(null);
  const { gsap } = registerGsap();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = ref.current;
      gsap.from(root.querySelector("[data-slide]"), {
        x: -80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
      gsap.from(root.querySelector("[data-mask]"), {
        clipPath: "inset(0 40% 0 0)",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
      gsap.to(root.querySelectorAll("[data-drift]"), {
        y: "+=18",
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.4,
      });
      gsap.from(root.querySelector("[data-cta]"), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: { trigger: root, start: "top 65%" },
      });
    },
    { scope: ref }
  );

  return (
    <section className={`section section--ocean ${styles.section}`} ref={ref}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-drift>
            Coffee on the go
          </p>
          <h2 data-slide>
            GREAT COFFEE.
            <br />
            RIGHT ON YOUR WAY.
          </h2>
          <p data-drift>
            Pull in at Frankston–Dandenong Road for a takeaway brew and a bite that
            keeps the day moving.
          </p>
          <div data-cta>
            <AnimatedButton href={business.mapsUrl} target="_blank" variant="primary">
              Find your Wildbean
            </AnimatedButton>
          </div>
        </div>
        <div className={styles.media}>
          <div className={styles.main} data-mask>
            <img
              src="/images/coffee/takeaway.jpg"
              alt="Takeaway coffee cup ready for the road"
              loading="lazy"
            />
          </div>
          <div className={styles.cutout} data-drift>
            <img
              src="/images/about/pastry.jpg"
              alt="Bakery pastry to go"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
