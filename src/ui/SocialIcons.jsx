import styles from "./SocialIcons.module.css";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M22.5 7.2a3 3 0 0 0-2.1-2.1C18.6 4.6 12 4.6 12 4.6s-6.6 0-8.4.5A3 3 0 0 0 1.5 7.2 31.5 31.5 0 0 0 1 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.5 8.4.5 8.4.5s6.6 0 8.4-.5a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 23 12a31.5 31.5 0 0 0-.5-4.8zM10 15.2V8.8L15.5 12 10 15.2z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M16.5 4c.4 2.2 1.9 3.8 4 4.2v2.7a7.4 7.4 0 0 1-4-1.2v6.4a5.9 5.9 0 1 1-5.9-5.9c.3 0 .7 0 1 .1v2.9a3 3 0 1 0 2.1 2.8V4h2.8z" />
    </svg>
  );
}

const ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  tiktok: TikTokIcon,
};

export default function SocialIcons({ links = [], className = "" }) {
  const items = links.filter((item) => item?.url && ICONS[item.id]);
  if (!items.length) return null;

  return (
    <ul className={`${styles.list} ${className}`.trim()} aria-label="Social media">
      {items.map((item) => {
        const Icon = ICONS[item.id];
        return (
          <li key={item.id}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              title={item.label}
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
