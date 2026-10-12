import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import {
  formatPrice,
  getItemsByCategory,
  menuCategories,
  menuItems,
} from "../data/menu";
import SectionHeading from "../ui/SectionHeading";
import AnimatedButton from "../ui/AnimatedButton";
import FoodModal from "../ui/FoodModal";
import FullMenuModal from "../ui/FullMenuModal";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./MenuExplorer.module.css";

export default function MenuExplorer({ activeCategory, onCategoryChange }) {
  const ref = useRef(null);
  const indicatorRef = useRef(null);
  const imageRef = useRef(null);
  const { gsap, Flip } = registerGsap();
  const [category, setCategory] = useState(activeCategory || "coffee");
  const [modalItem, setModalItem] = useState(null);
  const [fullOpen, setFullOpen] = useState(false);

  useEffect(() => {
    if (activeCategory && activeCategory !== category) {
      setCategory(activeCategory);
    }
  }, [activeCategory]);

  const items = useMemo(() => getItemsByCategory(category), [category]);
  const heroItem = items[0] || menuItems[0];

  const changeCategory = (id) => {
    if (id === category) return;
    const nextItems = getItemsByCategory(id);
    const nextHero = nextItems[0];
    const img = imageRef.current;
    if (!prefersReducedMotion() && img && nextHero) {
      const state = Flip.getState(img);
      img.src = nextHero.image;
      img.alt = nextHero.name;
      Flip.from(state, {
        duration: 0.55,
        ease: "power2.inOut",
        absolute: true,
        onEnter: (els) =>
          gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.45 }),
      });
    }
    setCategory(id);
    onCategoryChange?.(id);
  };

  useGSAP(
    () => {
      const switcher = ref.current?.querySelector(`.${styles.switcher}`);
      const activeBtn = ref.current?.querySelector(`[data-cat-btn][data-active="true"]`);
      if (!switcher || !activeBtn || !indicatorRef.current) return;

      activeBtn.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });

      gsap.to(indicatorRef.current, {
        x: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        duration: prefersReducedMotion() ? 0 : 0.35,
        ease: "power3.out",
      });
    },
    { dependencies: [category], scope: ref }
  );

  const openFromList = (item) => setModalItem(item);
  const navigateModal = (dir) => {
    if (!modalItem) return;
    const idx = items.findIndex((i) => i.id === modalItem.id);
    const next = items[(idx + dir + items.length) % items.length];
    setModalItem(next);
  };

  return (
    <section id="menu" className={`section section--ocean fine-pattern ${styles.section}`} ref={ref}>
      <div className={`container ${styles.wrap}`}>
        <div className={styles.top}>
          <SectionHeading eyebrow="The menu" title={"FIND YOUR\nNEXT FAVOURITE."} />
          <p className={styles.note}>
            Item names reflect the Wildbean range available at this outlet via Uber Eats.
            Branch-specific prices will appear here once verified — none are shown as
            confirmed yet.
          </p>
        </div>

        <div className={styles.switcher} role="tablist" aria-label="Menu categories">
          <span className={styles.indicator} ref={indicatorRef} aria-hidden />
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={category === cat.id}
              data-cat-btn
              data-active={category === cat.id}
              className={category === cat.id ? styles.active : ""}
              onClick={() => changeCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.explorer}>
          <div className={styles.heroImage}>
            <p className={styles.watermark} aria-hidden>
              MENU
            </p>
            <button type="button" onClick={() => openFromList(heroItem)} aria-label={`View ${heroItem.name}`}>
              <img ref={imageRef} src={heroItem.image} alt={heroItem.name} />
            </button>
          </div>

          <ul className={styles.list}>
            {items.map((item) => {
              const price = formatPrice(item);
              return (
                <li key={item.id}>
                  <button type="button" className={styles.row} onClick={() => openFromList(item)}>
                    <span className={styles.thumb}>
                      <img src={item.image} alt="" loading="lazy" />
                    </span>
                    <span className={styles.meta}>
                      <strong>{item.name}</strong>
                      <em>{item.description}</em>
                      {price ? <b className="price-tag">{price}</b> : null}
                    </span>
                    <ArrowUpRight className={styles.arrow} size={20} aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.actions}>
          <AnimatedButton type="button" onClick={() => setFullOpen(true)}>
            View full menu
          </AnimatedButton>
        </div>
      </div>

      <FoodModal
        item={modalItem}
        items={items}
        onClose={() => setModalItem(null)}
        onNavigate={navigateModal}
      />
      <FullMenuModal
        open={fullOpen}
        onClose={() => setFullOpen(false)}
        onSelectItem={(item) => {
          setFullOpen(false);
          setModalItem(item);
          changeCategory(item.category);
        }}
      />
    </section>
  );
}
