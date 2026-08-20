import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import type { TLogoProps } from "./types";

const logoYandex = (
  <Image
  src="/logo-yandex.svg"
  alt="логотип яндекса" width={48} height={48} />
);
const logoInclusion = (
  <Image
    src="/logo-inclusion.svg"
    alt="логотип инклюзии"
    width={48}
    height={48}
  />
);

const Logo = ({ urlYandex, urlInclusion }: TLogoProps) => {
  return (
    <div className={styles.logoContainer}>
      {urlYandex ? (
        <a href={urlYandex} target="_blank" rel="noopener noreferrer">
          {logoYandex}
        </a>
      ) : (
        logoYandex
      )}

      {urlInclusion ? (
        <Link href={urlInclusion}>{logoInclusion}</Link>
      ) : (
        logoInclusion
      )}
    </div>
  );
};

export default Logo;
