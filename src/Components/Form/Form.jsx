import { useState, useRef } from "react";
import { Transition } from "react-transition-group";
import {
  duration,
  defaultStyle,
  transitionStyles,
} from "../../Pages/styles/variables";
import styles from "./Form.module.scss";

const Form = ({ onSubmit }) => {
  const [formValue, setValue] = useState({
    name: "",
    telephone: "",
    text: "",
  });

  const [formErrors, setErrors] = useState({
    nameError: "",
    telephoneError: "",
    textError: "",
  });

  const nameRef = useRef(null);
  const telephoneRef = useRef(null);
  const textRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValue, formErrors);
  };

  const telephoneHandler = (e) => {
    const regex = /^[0-9\b]+$/;
    var currentValue = e.target.value;

    if (currentValue.length < 12) {
      setErrors({ ...formErrors, telephoneError: "*Слишком короткий номер" });
    }
    if (currentValue === "" || regex.test(currentValue)) {
      setValue({ ...formValue, telephone: currentValue });
    }
    if (currentValue.length > 11) {
      setValue({ ...formValue, telephone: currentValue.substring(0, 11) });
    }
    if (currentValue.length == 11) {
      setErrors({ ...formErrors, telephoneError: "" });
    }
  };

  const nameHandler = (e) => {
    var currentValue = e.target.value;
    if (currentValue.length > 6) {
      setValue({ ...formValue, name: currentValue });
      setErrors({
        ...formErrors,
        nameError: "",
      });
    }
    if (currentValue.length < 6) {
      setValue({ ...formValue, name: currentValue });
      setErrors({
        ...formErrors,
        nameError: "* Имя слишком короткое. Вы уверены, что не ошиблись?",
      });
    }
  };

  const textHandler = (e) => {
    var currentValue = e.target.value;
    var amountOfWords = currentValue.split(" ");

    if (amountOfWords.length < 10) {
      setErrors({
        ...formErrors,
        textError: "* Оставьте сообщение по крайне мере из 10 слов",
      });
    } else {
      setValue({ ...formValue, text: currentValue });
      setErrors({
        ...formErrors,
        textError: "",
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.slot}>
        <label>Как к вам обращаться?</label>
        <input
          onChange={nameHandler}
          type="text"
          name="name"
          placeholder="Иванов Иван Иванович"
          className={formErrors.nameError ? styles.inputError : null}
        />
      </div>

      <Transition
        nodeRef={nameRef}
        in={formErrors.nameError}
        timeout={duration}
      >
        {(state) => (
          <p
            ref={nameRef}
            className={styles.error}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {formErrors.nameError}
          </p>
        )}
      </Transition>

      <div className={styles.slot}>
        <label>Контактный номер телефона</label>
        <input
          onChange={telephoneHandler}
          className={formErrors.telephoneError ? styles.inputError : null}
          type="text"
          name="number"
          value={formValue.telephone}
          placeholder="79781234567"
        />
      </div>

      <Transition
        nodeRef={telephoneRef}
        in={formErrors.telephoneError}
        timeout={duration}
      >
        {(state) => (
          <p
            ref={telephoneRef}
            className={styles.error}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {formErrors.telephoneError}
          </p>
        )}
      </Transition>

      <div className={styles.slot}>
        <label>Что бы вы хотели обсудить?</label>
        <textarea
          className={formErrors.textError ? styles.inputError : null}
          onChange={textHandler}
          name="text"
        />
      </div>

      <Transition
        nodeRef={textRef}
        in={formErrors.textError}
        timeout={duration}
      >
        {(state) => (
          <p
            ref={textRef}
            className={styles.error}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {formErrors.textError}
          </p>
        )}
      </Transition>

      <input type="submit" />
    </form>
  );
};

export default Form;
