import styles from './styles.module.css';
import type { TSurfaceProps } from "./types";

export const Surface: React.FC<TSurfaceProps> = ({
  children
}) => {
  return (
    <div className={styles.surface}>{children}</div>
  );
};
