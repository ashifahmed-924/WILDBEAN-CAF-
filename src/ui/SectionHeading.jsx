import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./SectionHeading.module.css";

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  align = "left",
  light = false,
  className = "",
}) {
  const ref = useRef(null);
  const { gsap } = registerGsap();

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.from(ref.current.querySelectorAll("[data-reveal]"), {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`${styles.heading} ${styles[align]} ${light ? styles.light : ""} ${className}`.trim()}
    >
      {eyebrow ? (
        <p className={styles.eyebrow} data-reveal>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={styles.title} data-reveal>
        {title}
        {accent ? <span className={styles.accent}>{accent}</span> : null}
      </h2>
    </div>
  );
}
