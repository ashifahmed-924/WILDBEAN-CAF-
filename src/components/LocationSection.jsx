import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MapPin, Phone } from "lucide-react";
import { business } from "../data/business";
import SectionHeading from "../ui/SectionHeading";
import AnimatedButton from "../ui/AnimatedButton";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./LocationSection.module.css";

export default function LocationSection() {
  const ref = useRef(null);
  const { gsap } = registerGsap();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current.querySelectorAll("[data-loc]"), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref }
  );

  return (
    <section id="find-us" className={`section section--ivory ${styles.section}`} ref={ref}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy} data-loc>
          <SectionHeading
            light
            eyebrow="Visit us"
            title={
              <>
                {"FIND US.\n"}
                <span data-keep-row>FEEL AT HOME.</span>
              </>
            }
          />
          <ul className={styles.details}>
            <li>
              <MapPin size={20} aria-hidden />
              <div>
                <strong>Address</strong>
                <p>{business.address.formatted}</p>
              </div>
            </li>
            <li>
              <Phone size={20} aria-hidden />
              <div>
                <strong>Phone</strong>
                <p>
                  <a href={business.phone.tel}>{business.phone.display}</a>
                </p>
              </div>
            </li>
          </ul>
          {!business.hoursVerified ? (
            <p className={styles.hoursNote}>
              Opening hours are not published here until independently verified.
              Call ahead or use directions for the latest status.
            </p>
          ) : null}
          <div className={styles.actions}>
            <AnimatedButton href={business.mapsUrl} target="_blank" variant="dark">
              Get directions
            </AnimatedButton>
            <AnimatedButton href={business.phone.tel} variant="ghost" className={styles.call}>
              Call the cafe
            </AnimatedButton>
          </div>
        </div>

        <div className={styles.panel} data-loc>
          <div className={styles.badge} aria-hidden>
            DS
          </div>
          <div className={styles.map}>
            <iframe
              title="Wildbean Café Dandenong South on Google Maps"
              src={business.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className={styles.photo}>
            <img
              src="/images/gallery/location.jpg"
              alt="Café atmosphere near the counter"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
