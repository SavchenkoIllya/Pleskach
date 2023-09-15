import styles from "./MobileMenu.module.scss"

const MobileMenu = ({ children }) => {
  return <ul className={styles.mobileMenu}>{children}</ul>;
};

export default MobileMenu;
