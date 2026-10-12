import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { formatPrice, getFeaturedItems } from "../data/menu";
import { business } from "../data/business";
import SectionHeading from "../ui/SectionHeading";
import AnimatedButton from "../ui/AnimatedButton";
import FoodModal from "../ui/FoodModal";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./PopularItems.module.css";

export default function PopularItems() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const { gsap } = registerGsap();
  const items = useMemo(() => getFeaturedItems(), []);
  const loopItems = useMemo(() => [...items, ...items], [items]);
  const [modalItem, setModalItem] = useState(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current.querySelectorAll("[data-pop-head]"), {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref }
  );

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || prefersReducedMotion()) return undefined;

      const startLoop = () => {
        tweenRef.current?.kill();
        gsap.set(track, { x: 0 });
        const total = track.scrollWidth / 2;
        if (!total) return;

        tweenRef.current = gsap.to(track, {
          x: -total,
          duration: Math.max(28, total / 40),
          ease: "none",
          repeat: -1,
        });
      };

      startLoop();

      const onResize = () => startLoop();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        tweenRef.current?.kill();
      };
    },
    { scope: ref, dependencies: [items.length] }
  );

  useGSAP(
    () => {
      if (!tweenRef.current) return;
      if (modalItem) tweenRef.current.pause();
      else tweenRef.current.resume();
    },
    { dependencies: [modalItem] }
  );

  return (
    <section id="favourites" className={`section section--dark ${styles.section}`} ref={ref}>
      <div className={`container ${styles.head}`} data-pop-head>
        <SectionHeading
          eyebrow="Popular picks"
          className={styles.picksHeading}
          title={
            <>
              <span data-keep-row className={styles.linePrimary}>
                A LITTLE SOMETHING
              </span>
              <span data-keep-row className={styles.lineAccent}>
                TO LOOK FORWARD TO.
              </span>
            </>
          }
        />
      </div>

      <div className={styles.viewport} aria-label="Popular food items scrolling">
        <div className={styles.track} ref={trackRef} data-track>
          {loopItems.map((item, i) => {
            const price = formatPrice(item);
            return (
              <article key={`${item.id}-${i}`} className={styles.card} data-card>
                <button type="button" onClick={() => setModalItem(item)}>
                  <div className={styles.imageWrap}>
                    <img src={item.image} alt={item.name} loading="lazy" draggable={false} />
                  </div>
                  <div className={styles.meta}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    {price ? <span className="price-tag">{price}</span> : null}
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <div className={`container ${styles.cta}`} data-pop-head>
        <AnimatedButton href={business.orderUrl} target="_blank" variant="ghost">
          Order on Uber Eats
        </AnimatedButton>
      </div>

      <FoodModal
        item={modalItem}
        items={items}
        onClose={() => setModalItem(null)}
        onNavigate={(dir) => {
          if (!modalItem) return;
          const idx = items.findIndex((i) => i.id === modalItem.id);
          setModalItem(items[(idx + dir + items.length) % items.length]);
        }}
      />
    </section>
  );
}
