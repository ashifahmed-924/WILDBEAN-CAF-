import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import AnimatedButton from "../ui/AnimatedButton";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./HotFoodSection.module.css";

export default function HotFoodSection({ onSelectCategory }) {
  const ref = useRef(null);
  const { gsap } = registerGsap();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current.querySelectorAll("[data-hot]"), {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    },
    { scope: ref }
  );

  const goHot = () => {
    onSelectCategory?.("hot-food");
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={`section section--jade ${styles.section}`} ref={ref}>
      <div className={`container-wide ${styles.layout}`}>
        <div className={styles.copy} data-hot>
          <p className={styles.eyebrow}>Prepared food</p>
          <h2>
            HOT.
            <br />
            FRESH.
            <br />
            READY TO GO.
          </h2>
          <p>
            Pies, toasties and prepared favourites — made for hunger that won’t wait.
          </p>
          <AnimatedButton type="button" variant="primary" onClick={goHot}>
            Explore hot food
          </AnimatedButton>
        </div>
        <div className={styles.gallery}>
          <div className={styles.feature} data-hot>
            <img
              src="/images/gallery/hot-feature.jpg"
              alt="Hot savoury pastry fresh from the oven"
              loading="lazy"
            />
          </div>
          <div className={styles.side} data-hot>
            <img
              src="/images/gallery/hot-side1.jpg"
              alt="Freshly prepared hot meal"
              loading="lazy"
            />
          </div>
          <div className={`${styles.side} ${styles.offset}`} data-hot>
            <img
              src="/images/gallery/hot-side2.jpg"
              alt="Warm comfort food bowl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
