import styles from "./SectionIntro.module.css";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export default function SectionIntro({
  eyebrow,
  title,
  copy,
  align = "left",
  inverse = false,
}: SectionIntroProps) {
  const classes = [
    styles.intro,
    align === "center" ? styles.center : "",
    inverse ? styles.inverse : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      {copy ? <p className={styles.copy}>{copy}</p> : null}
    </div>
  );
}

