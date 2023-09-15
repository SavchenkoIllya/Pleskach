import styles from "./MobileMenuItem.module.scss";

const MenuItem = ({ children }) => {
  return <li className={styles.mobileList}>{children}</li>;
};

export default MenuItem;
