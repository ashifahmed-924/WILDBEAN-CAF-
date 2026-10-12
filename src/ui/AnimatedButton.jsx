import { ArrowRight } from "lucide-react";
import styles from "./AnimatedButton.module.css";

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  icon = true,
  className = "",
  target,
  rel,
  type = "button",
  ariaLabel,
}) {
  const classes = `${styles.btn} ${styles[variant] || ""} ${className}`.trim();
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {icon ? <ArrowRight className={styles.icon} size={18} aria-hidden /> : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
