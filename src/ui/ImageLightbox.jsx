import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./ImageLightbox.module.css";

export default function ImageLightbox({ images, index, onClose, onNavigate }) {
  const figureRef = useRef(null);
  const { gsap } = registerGsap();
  const image = images[index];
  const touchX = useRef(null);

  useGSAP(
    () => {
      if (!image || !figureRef.current) return;
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        figureRef.current,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    },
    { dependencies: [index] }
  );

  useEffect(() => {
    if (index == null) return undefined;
    document.body.classList.add("modal-open");
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, onNavigate]);

  if (index == null || !image) return null;

  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Image gallery">
      <button type="button" className={styles.scrim} onClick={onClose} aria-label="Close lightbox" />
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
        <X size={24} />
      </button>
      <button type="button" className={styles.prev} onClick={() => onNavigate(-1)} aria-label="Previous">
        <ChevronLeft size={28} />
      </button>
      <figure
        ref={figureRef}
        className={styles.figure}
        onTouchStart={(e) => {
          touchX.current = e.changedTouches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (dx > 50) onNavigate(-1);
          if (dx < -50) onNavigate(1);
          touchX.current = null;
        }}
      >
        <img src={image.src} alt={image.alt} />
        <figcaption>
          <span>{image.label}</span>
          <span>
            {index + 1} / {images.length}
          </span>
        </figcaption>
      </figure>
      <button type="button" className={styles.next} onClick={() => onNavigate(1)} aria-label="Next">
        <ChevronRight size={28} />
      </button>
    </div>
  );
}
