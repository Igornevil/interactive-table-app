import React, { useState, useContext, useEffect, useMemo } from "react";
import { MatrixContext } from "../../context/MatrixContext";
import Input from "../Input/Input";
import styles from "./UserInput.module.scss";
import Button from "../Button/Button";

const UserInput: React.FC = () => {
  const { setMatrixData, setXValue: setGlobalX, X } = useContext(MatrixContext);

  const [mValue, setMValue] = useState<number | "">("");
  const [nValue, setNValue] = useState<number | "">("");
  const [xValue, setXValue] = useState<number | "">(X > 0 ? X : "");

  useEffect(() => {
    if (document.activeElement?.id !== "X") {
      setXValue(X > 0 ? X : "");
    }
  }, [X]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMatrixData(Number(mValue) || 0, Number(nValue) || 0);
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number | "">>,
    globalSetter?: (value: number) => void
  ) => {
    const value = e.target.value;
    if (value === "") {
      setter("");
      if (globalSetter) {
        globalSetter(0);
      }
    } else {
      const numValue = parseInt(value, 10);
      setter(numValue);
      if (globalSetter) {
        globalSetter(numValue);
      }
    }
  };

  const isDisabled = useMemo(() => {
    const m = Number(mValue);
    const n = Number(nValue);
    return m < 1 || n < 1;
  }, [mValue, nValue]);

  return (
    <div className={styles.userInputContainer}>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <Input
          label="Кількість рядків (M):"
          id="M"
          type="number"
          value={mValue}
          onChange={(e) => handleNumberChange(e, setMValue)}
          min="0"
          max="100"
          placeholder="від 0 до 100"
        />
        <Input
          label="Кількість стовпців (N):"
          id="N"
          type="number"
          value={nValue}
          onChange={(e) => handleNumberChange(e, setNValue)}
          min="0"
          max="100"
          placeholder="від 0 до 100"
        />
        <Button type="submit" disabled={isDisabled}>
          Сгенерувати
        </Button>
      </form>
      <div className={styles.xInputGroup}>
        <Input
          label="Кількість для підсвітки (X):"
          id="X"
          type="number"
          value={xValue}
          onChange={(e) => handleNumberChange(e, setXValue, setGlobalX)}
          min="0"
          placeholder="Введіть число"
        />
      </div>
    </div>
  );
};

export default UserInput;
