import styles from "./PageWrapper.module.scss";
import { gradient } from "../../Pages/styles/variables";
import { memo } from "react";

const PageWrapper = memo(function PageWrapper({
  children,
  background = gradient,
}) {
  return (
    <div className={styles.background} style={{ background: background }}>
      <div className={styles.blur}>{children}</div>
    </div>
  );
});

export default PageWrapper;
