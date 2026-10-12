import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";
import { menuCategories, menuItems, formatPrice } from "../data/menu";
import { business } from "../data/business";
import AnimatedButton from "./AnimatedButton";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./FullMenuModal.module.css";

export default function FullMenuModal({ open, onClose, onSelectItem }) {
  const panelRef = useRef(null);
  const { gsap } = registerGsap();

  useGSAP(
    () => {
      if (!open || !panelRef.current) return;
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        panelRef.current,
        { y: "100%" },
        { y: "0%", duration: 0.55, ease: "power3.out" }
      );
    },
    { dependencies: [open] }
  );

  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add("modal-open");
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Full menu">
      <div className={styles.panel} ref={panelRef}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Full menu</p>
            <h2>Wildbean favourites</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close full menu">
            <X size={24} />
          </button>
        </header>
        <div className={styles.body}>
          {menuCategories.map((cat) => {
            const items = menuItems.filter((i) => i.category === cat.id);
            if (!items.length) return null;
            return (
              <section key={cat.id} className={styles.group}>
                <h3>{cat.label}</h3>
                <ul>
                  {items.map((item) => {
                    const price = formatPrice(item);
                    return (
                      <li key={item.id}>
                        <button type="button" onClick={() => onSelectItem(item)}>
                          <img src={item.image} alt="" />
                          <span>
                            <strong>{item.name}</strong>
                            <em>{item.description}</em>
                          </span>
                          {price ? <b className="price-tag">{price}</b> : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
        <footer className={styles.footer}>
          <p>Order for delivery via Uber Eats when available at this store.</p>
          <AnimatedButton href={business.orderUrl} target="_blank" variant="primary">
            Order on Uber Eats
          </AnimatedButton>
        </footer>
      </div>
    </div>
  );
}
