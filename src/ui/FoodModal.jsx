import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { formatPrice } from "../data/menu";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./FoodModal.module.css";

export default function FoodModal({ item, items, onClose, onNavigate }) {
  const panelRef = useRef(null);
  const { gsap } = registerGsap();
  const index = items.findIndex((i) => i.id === item?.id);

  useGSAP(
    () => {
      if (!item || !panelRef.current) return;
      if (prefersReducedMotion()) {
        gsap.set(panelRef.current, { opacity: 1, scale: 1 });
        return;
      }
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.92, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );
    },
    { dependencies: [item?.id] }
  );

  useEffect(() => {
    if (!item) return undefined;
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
  }, [item, onClose, onNavigate]);

  if (!item) return null;
  const price = formatPrice(item);

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={item.name}>
      <button type="button" className={styles.scrim} onClick={onClose} aria-label="Close" />
      <div className={styles.panel} ref={panelRef}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>
        <div className={styles.media}>
          <img src={item.image} alt={item.name} />
        </div>
        <div className={styles.content}>
          <p className={styles.cat}>{item.category.replace("-", " ")}</p>
          <h3>{item.name}</h3>
          {item.description ? <p className={styles.desc}>{item.description}</p> : null}
          {price ? <p className="price-tag">{price}</p> : null}
          {item.sizes?.length ? (
            <p className={styles.sizes}>Sizes: {item.sizes.join(" · ")}</p>
          ) : null}
          <div className={styles.controls}>
            <button type="button" onClick={() => onNavigate(-1)} aria-label="Previous item">
              <ChevronLeft size={22} />
            </button>
            <span>
              {index + 1} / {items.length}
            </span>
            <button type="button" onClick={() => onNavigate(1)} aria-label="Next item">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
