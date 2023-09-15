import styles from "./Telephone.module.scss";
import WhatsAppIcon from "../../../assets/WhatsApp.png";
import TelegramIcon from "../../../assets/Telegram_logo.svg.webp";

const Telephone = ({ children }) => {
  return (
    <div className={styles.telephone}>
      <a href={"tel:" + children} target="_blank" rel="noreferrer">
        <p>{children}</p>
      </a>
      <img className={styles.icon} alt="WhatsApp icon" src={WhatsAppIcon} />
      <img className={styles.tgIcon} alt="Telegram icon" src={TelegramIcon} />
    </div>
  );
};

export default Telephone;
