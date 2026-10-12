import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { navLinks } from "../data/navigation";
import FullscreenNavigation from "../ui/FullscreenNavigation";
import AnimatedButton from "../ui/AnimatedButton";
import styles from "./Header.module.css";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setNavOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className={`${styles.header} ${solid ? styles.solid : ""}`} data-header>
        <div className={`container-wide ${styles.inner}`}>
          <a href="#home" className={styles.logo} onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}>
            <span className={styles.logoMain}>WILDBEAN</span>
            <span className={styles.logoSub}>CAFÉ</span>
          </a>

          <nav className={styles.desktopNav} aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <AnimatedButton href="#menu" className={styles.cta} icon={false} onClick={(e) => { e.preventDefault(); scrollTo("#menu"); }}>
              Explore menu
            </AnimatedButton>
            <button
              type="button"
              className={styles.menuBtn}
              aria-label="Open navigation menu"
              aria-expanded={navOpen}
              onClick={() => setNavOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>
      <FullscreenNavigation
        open={navOpen}
        onClose={() => setNavOpen(false)}
        onNavigate={scrollTo}
      />
    </>
  );
}
