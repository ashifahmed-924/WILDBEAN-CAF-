import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { marqueeImages } from "../data/gallery";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./FoodMarquee.module.css";

export default function FoodMarquee() {
  const ref = useRef(null);
  const { gsap } = registerGsap();

  useGSAP(
    () => {
      const track = ref.current?.querySelector("[data-track]");
      const textTrack = ref.current?.querySelector("[data-text-track]");
      if (!track || !textTrack) return;

      if (prefersReducedMotion()) return;

      const loop = (el, direction = -1, duration = 40) => {
        const total = el.scrollWidth / 2;
        gsap.fromTo(
          el,
          { x: direction > 0 ? -total : 0 },
          {
            x: direction > 0 ? 0 : -total,
            duration,
            ease: "none",
            repeat: -1,
          }
        );
      };

      loop(track, -1, 55);
      loop(textTrack, 1, 35);
    },
    { scope: ref }
  );

  const doubled = [...marqueeImages, ...marqueeImages];
  const text = "SIP • SNACK • GO • REPEAT • ";

  return (
    <section className={`section section--dark ${styles.section}`} ref={ref} aria-label="Food filmstrip">
      <div className={styles.textRow} aria-hidden>
        <div className={styles.textTrack} data-text-track>
          <span>{text.repeat(8)}</span>
          <span>{text.repeat(8)}</span>
        </div>
      </div>
      <div className={styles.trackWrap}>
        <div className={styles.track} data-track>
          {doubled.map((img, i) => (
            <figure
              key={`${img.id}-${i}`}
              className={`${styles.frame} ${styles[img.width] || styles.medium}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
