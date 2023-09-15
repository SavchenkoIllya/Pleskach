import { useNavigate } from "react-router-dom";

import styles from "./Button.module.scss";

const Button = ({ children, action, isBack = false }) => {
  const navigate = useNavigate();

  function handleFunction(e) {
    e.preventDefault();
    if (isBack) {
      return navigate("/")
    }
    action();
  }

  return (
    <button
      onClick={(e) => handleFunction(e)}
      className={isBack ? styles.back : styles.notBack}
    >
      {children}
    </button>
  );
};

export default Button;
