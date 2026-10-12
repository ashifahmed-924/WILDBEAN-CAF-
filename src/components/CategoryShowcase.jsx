import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./CategoryShowcase.module.css";

const categories = [
  {
    id: "coffee",
    label: "COFFEE",
    image: "/images/menu/latte.jpg",
    featured: true,
  },
  {
    id: "hot-food",
    label: "HOT FOOD",
    image: "/images/menu/toastie.jpg",
  },
  {
    id: "bakery",
    label: "BAKERY",
    image: "/images/menu/croissant.jpg",
  },
  {
    id: "cold-drinks",
    label: "COLD DRINKS",
    image: "/images/menu/iced-latte.jpg",
  },
];

function CategoryTile({ cat, className = "", onSelect }) {
  return (
    <button
      type="button"
      className={`${styles.tile} ${cat.featured ? styles.featured : ""} ${className}`.trim()}
      data-tile
      onClick={() => onSelect(cat.id)}
    >
      <img src={cat.image} alt="" loading="lazy" />
      <span className={styles.shade} />
      <span className={styles.label}>
        {cat.label}
        <ArrowUpRight size={22} aria-hidden />
      </span>
    </button>
  );
}

export default function CategoryShowcase({ onSelectCategory }) {
  const ref = useRef(null);
  const { gsap } = registerGsap();
  const featured = categories.find((c) => c.featured);
  const others = categories.filter((c) => !c.featured);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current.querySelectorAll("[data-tile]"), {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref }
  );

  const select = (id) => {
    onSelectCategory?.(id);
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={`section section--dark ${styles.section}`} ref={ref}>
      <div className="container">
        <SectionHeading eyebrow="Start here" title={"PICK YOUR\nCRAVING."} />

        {/* Desktop collage */}
        <div className={`${styles.grid} ${styles.desktopGrid}`}>
          {categories.map((cat) => (
            <CategoryTile key={cat.id} cat={cat} onSelect={select} />
          ))}
        </div>

        {/* Tablet / mobile — coffee fixed, others swipe in one row */}
        <div className={styles.tabletLayout}>
          <CategoryTile cat={featured} onSelect={select} className={styles.featuredSolo} />
          <div className={styles.swipeRow} aria-label="More categories">
            {others.map((cat) => (
              <CategoryTile
                key={cat.id}
                cat={cat}
                onSelect={select}
                className={styles.swipeTile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
