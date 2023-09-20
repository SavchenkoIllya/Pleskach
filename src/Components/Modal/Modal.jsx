import styles from "./Modal.module.scss";
import { animated } from "react-spring";

const Modal = ({ style, text }) => {
  return (
    <animated.div className={styles.wrapper} style={style}>
      <div className={styles.modalWindow}>
        <p>{text}</p>
      </div>
    </animated.div>
  );
};

export default Modal;
