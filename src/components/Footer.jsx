import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUp } from "lucide-react";
import { business } from "../data/business";
import { navLinks } from "../data/navigation";
import AnimatedButton from "../ui/AnimatedButton";
import SocialIcons from "../ui/SocialIcons";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./Footer.module.css";

export default function Footer() {
  const ref = useRef(null);
  const { gsap } = registerGsap();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current.querySelectorAll("[data-foot]"), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    },
    { scope: ref }
  );

  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} ref={ref}>
      <p className={styles.outline} aria-hidden>
        WILDBEAN
      </p>
      <div className={`container ${styles.inner}`}>
        <div className={styles.topRow} data-foot>
          <div className={styles.brand}>
            <p className={styles.wordmark}>WILDBEAN</p>
            <p className={styles.cafe}>CAFÉ · {business.branch}</p>
            <SocialIcons links={business.social} className={styles.social} />
          </div>
          <AnimatedButton href={business.mapsUrl} target="_blank" variant="primary" className={styles.cta}>
            Get directions
          </AnimatedButton>
        </div>

        <div className={styles.cols} data-foot>
          <nav aria-label="Footer">
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.visit}>
            <p>{business.address.formatted}</p>
            <a href={business.phone.tel}>{business.phone.display}</a>
          </div>
        </div>

        <div className={styles.bottom} data-foot>
          <p>
            © {year} {business.fullName}. All rights reserved.
          </p>
          <button
            type="button"
            className={styles.top}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top <ArrowUp size={14} aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
