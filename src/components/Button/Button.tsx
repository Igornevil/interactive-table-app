import React, { type ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...rest
}) => {
  const buttonClassName = classNames(
    styles.button,
    {
      [styles.disabled]: disabled,
    },
    className
  );

  return (
    <button className={buttonClassName} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
