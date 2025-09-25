import React, { type InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...rest }) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
    </div>
  );
};

export default Input;
