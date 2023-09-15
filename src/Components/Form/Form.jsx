import { useState } from "react";
import styles from "./Form.module.scss";

const Form = () => {
  const [formValue, setValue] = useState({
    name: "",
    number: "",
    text: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const formHandler = (e) => {
    setValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const telephoneHandler = (e) => {
    const regex = /^[0-9\b]+$/;
    var currentValue = e.target.value;

    if (currentValue === "" || regex.test(currentValue)) {
      setValue({ ...formValue, number: currentValue });
    }
    if (currentValue.length > 11) {
      setValue({ ...formValue, number: currentValue.substring(0, 11) });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.slot}>
        <label>Как к вам обращаться?</label>
        <input
          onChange={formHandler}
          type="text"
          name="name"
          placeholder="Иванов Иван Иванович"
        />
      </div>
      <div className={styles.slot}>
        <label>Контактный номер телефона</label>
        <input
          onChange={telephoneHandler}
          type="text"
          name="number"
          value={formValue.number}
          pattern="[0-9]*"
          placeholder="79781234567"
        />
      </div>
      <div className={styles.slot}>
        <label>Что бы вы хотели обсудить?</label>
        <textarea onChange={formHandler} name="text" />
      </div>
      <input type="submit" />
    </form>
  );
};

export default Form;
