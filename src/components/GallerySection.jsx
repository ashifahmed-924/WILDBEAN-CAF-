import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { galleryImages } from "../data/gallery";
import SectionHeading from "../ui/SectionHeading";
import ImageLightbox from "../ui/ImageLightbox";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import { clipReveal } from "../animations/imageReveal";
import styles from "./GallerySection.module.css";

export default function GallerySection() {
  const ref = useRef(null);
  const { gsap } = registerGsap();
  const [active, setActive] = useState(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      clipReveal(ref.current.querySelectorAll("[data-gal]"), {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        stagger: 0.12,
      });
      gsap.utils.toArray(ref.current.querySelectorAll("[data-gal] img")).forEach((img) => {
        gsap.to(img, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="gallery" className={`section section--ivory ${styles.section}`} ref={ref}>
      <div className="container">
        <SectionHeading
          light
          eyebrow="Wildbean moments"
          title={
            <>
              {"MOMENTS AT\n"}
              <span data-keep-row>THE EXCHANGE.</span>
            </>
          }
        />
        <div className={styles.grid}>
          {galleryImages.map((img) => (
            <button
              key={img.id}
              type="button"
              className={`${styles.item} ${img.wide ? styles.wide : ""} ${img.tall ? styles.tall : ""} img-reveal`}
              data-gal
              onClick={() => setActive(galleryImages.findIndex((g) => g.id === img.id))}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <span className={styles.label}>{img.label}</span>
            </button>
          ))}
        </div>
        <p className={styles.disclaimer}>
          Imagery is atmospheric café photography for mood and menu inspiration — not
          photographs of this specific Wildbean branch.
        </p>
      </div>
      <ImageLightbox
        images={galleryImages}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={(dir) =>
          setActive((i) => (i == null ? i : (i + dir + galleryImages.length) % galleryImages.length))
        }
      />
    </section>
  );
}
