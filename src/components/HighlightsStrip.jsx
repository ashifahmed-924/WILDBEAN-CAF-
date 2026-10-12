import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./HighlightsStrip.module.css";

const features = [
  { title: "FRESH COFFEE", image: "/images/features/coffee.jpg", alt: "Fresh coffee cup" },
  { title: "HOT FOOD", image: "/images/features/hot-food.jpg", alt: "Hot prepared food" },
  { title: "BAKERY TREATS", image: "/images/features/bakery.jpg", alt: "Bakery pastry" },
  { title: "ON THE GO", image: "/images/features/onthego.jpg", alt: "Takeaway coffee" },
];

export default function HighlightsStrip() {
  const ref = useRef(null);
  const { gsap } = registerGsap();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current.querySelectorAll("[data-feature]"), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    },
    { scope: ref }
  );

  return (
    <section id="highlights" className={`section section--jade fine-pattern ${styles.strip}`} ref={ref}>
      <div className={`container ${styles.grid}`}>
        {features.map((f, i) => (
          <article key={f.title} className={styles.item} data-feature>
            <div className={styles.thumb}>
              <img src={f.image} alt={f.alt} loading="lazy" />
            </div>
            <h3>{f.title}</h3>
            {i < features.length - 1 ? <span className={styles.divider} aria-hidden /> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
