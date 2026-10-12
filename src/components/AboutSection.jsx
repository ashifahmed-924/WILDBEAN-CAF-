import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SectionHeading from "../ui/SectionHeading";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import { clipReveal } from "../animations/imageReveal";
import { gentleParallax } from "../animations/parallax";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const ref = useRef(null);
  const { gsap } = registerGsap();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      clipReveal(root.querySelectorAll("[data-reveal-img]"), {
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
      gentleParallax(root.querySelector("[data-parallax]"), { yPercent: -8 });
      gsap.from(root.querySelectorAll("[data-float]"), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 65%" },
      });
    },
    { scope: ref }
  );

  return (
    <section id="about" className={`section section--ivory ${styles.about}`} ref={ref}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <SectionHeading
            light
            eyebrow="Welcome to Wildbean"
            title={"GOOD COFFEE.\nGOOD COMPANY."}
          />
          <p data-float>
            At Wildbean Café Dandenong South, great coffee meets everyday convenience.
            Whether you need a quick flat white, a warm bakery bite or something hot
            for the road, we are ready when you are.
          </p>
          <a href="#menu" className={styles.link} data-float>
            Discover the menu
            <span className={styles.underline} />
          </a>
        </div>
        <div className={styles.collage}>
          <div className={`${styles.tall} img-reveal`} data-reveal-img>
            <img
              src="/images/about/coffee-tall.jpg"
              alt="Tall coffee cup in soft light"
              loading="lazy"
              data-parallax
            />
          </div>
          <div className={`${styles.small} img-reveal`} data-reveal-img data-float>
            <img
              src="/images/about/pastry.jpg"
              alt="Fresh bakery croissant"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
