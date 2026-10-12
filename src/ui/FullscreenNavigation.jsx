import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";
import { navLinks } from "../data/navigation";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./FullscreenNavigation.module.css";

const previews = {
  home: "/images/hero/hero-coffee.jpg",
  about: "/images/about/coffee-tall.jpg",
  menu: "/images/menu/latte.jpg",
  favourites: "/images/menu/croissant.jpg",
  gallery: "/images/gallery/g7.jpg",
  "find-us": "/images/gallery/location.jpg",
};

export default function FullscreenNavigation({ open, onClose, onNavigate }) {
  const overlayRef = useRef(null);
  const previewRef = useRef(null);
  const wasOpen = useRef(false);
  const { gsap } = registerGsap();

  useGSAP(
    () => {
      if (!overlayRef.current) return;
      const links = overlayRef.current.querySelectorAll("[data-nav-link]");

      if (prefersReducedMotion()) {
        gsap.set(overlayRef.current, {
          display: open ? "flex" : "none",
          autoAlpha: open ? 1 : 0,
          clipPath: open ? "none" : "circle(0% at 92% 8%)",
        });
        wasOpen.current = open;
        return;
      }

      if (open) {
        const tl = gsap.timeline();
        tl.set(overlayRef.current, { display: "flex", autoAlpha: 1 })
          .fromTo(
            overlayRef.current,
            { clipPath: "circle(0% at 92% 8%)" },
            {
              clipPath: "circle(150% at 50% 50%)",
              duration: 0.85,
              ease: "power3.inOut",
            }
          )
          .fromTo(
            links,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.55,
              ease: "power3.out",
            },
            "-=0.35"
          );
        wasOpen.current = true;
      } else if (wasOpen.current) {
        gsap.to(overlayRef.current, {
          clipPath: "circle(0% at 92% 8%)",
          duration: 0.55,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(overlayRef.current, { display: "none", autoAlpha: 0 });
          },
        });
        wasOpen.current = false;
      }
    },
    { dependencies: [open] }
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [open, onClose]);

  const handleHover = (id) => {
    if (!previewRef.current || !previews[id]) return;
    previewRef.current.style.backgroundImage = `url(${previews[id]})`;
  };

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      style={{ display: "none" }}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close menu">
        <X size={28} />
      </button>
      <nav className={styles.nav}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                data-nav-link
                onMouseEnter={() => handleHover(link.id)}
                onFocus={() => handleHover(link.id)}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.preview} ref={previewRef} aria-hidden />
    </div>
  );
}
