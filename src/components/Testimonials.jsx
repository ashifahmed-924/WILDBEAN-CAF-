import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "../data/reviews";
import SectionHeading from "../ui/SectionHeading";
import { registerGsap, prefersReducedMotion } from "../animations/gsapSetup";
import styles from "./Testimonials.module.css";

/** Editorial community notes — not attributed as personal customer reviews */
const communityNotes = [
  {
    id: "c1",
    text: "Barista coffee made for the everyday stop — hot, iced, and milk alternatives when you need them.",
    label: "Coffee",
  },
  {
    id: "c2",
    text: "Bakery treats and sweet bites ready beside the machine for a quick morning or afternoon pick-up.",
    label: "Bakery",
  },
  {
    id: "c3",
    text: "Hot food and prepared favourites when you want something more substantial on the way.",
    label: "Hot food",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const { gsap } = registerGsap();
  const hasReviews = reviews.length > 0;
  const items = hasReviews ? reviews : communityNotes;
  const [index, setIndex] = useState(0);
  const current = items[index] || items[0];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current.querySelectorAll("[data-reveal-col]"), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref }
  );

  useGSAP(
    () => {
      const card = ref.current?.querySelector("[data-review-card]");
      if (!card || prefersReducedMotion()) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );
    },
    { dependencies: [index], scope: ref }
  );

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <section className={`section section--jade ${styles.section}`} ref={ref} id="reviews">
      <div className={`container ${styles.layout}`}>
        <div className={styles.headingCol} data-reveal-col>
          <SectionHeading
            eyebrow="Reviews"
            title={
              <>
                {"WORDS FROM OUR\n"}
                <span data-keep-row>COMMUNITY.</span>
              </>
            }
          />
        </div>

        <div className={styles.reviewCol} data-reveal-col>
          <blockquote className={styles.quote} data-review-card data-card>
            <span className={styles.mark} aria-hidden>
              “
            </span>
            <p>{current.text}</p>
            <footer>
              {hasReviews ? (
                <>
                  <cite>{current.name}</cite>
                  {current.rating ? <span>{current.rating}/5</span> : null}
                </>
              ) : (
                <cite>{current.label}</cite>
              )}
            </footer>
          </blockquote>

          {items.length > 1 ? (
            <div className={styles.controls}>
              <button type="button" onClick={prev} aria-label="Previous review">
                <ChevronLeft size={20} />
              </button>
              <span>
                {index + 1} / {items.length}
              </span>
              <button type="button" onClick={next} aria-label="Next review">
                <ChevronRight size={20} />
              </button>
            </div>
          ) : null}

          {!hasReviews ? (
            <p className={styles.note}>
              Named customer reviews for this branch were not available for
              republication at last check. These notes reflect menu categories at
              Wildbean Café Dandenong South.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
