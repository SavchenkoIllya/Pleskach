import styles from "./MenuItem.module.scss";

const MenuItem = ({ children }) => {
  return <li className={styles.desktopList}>{children}</li>;
};

export default MenuItem;
