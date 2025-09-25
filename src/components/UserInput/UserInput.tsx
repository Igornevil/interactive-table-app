import React, { useState, useContext } from "react";
import { MatrixContext } from "../../context/MatrixContext";
import Input from "../Input/Input";
import styles from "./UserInput.module.scss";
import Button from "../Button/Button";

const UserInput: React.FC = () => {
  const { setMatrixData, setXValue, X } = useContext(MatrixContext);
  const [M, setM] = useState(10);
  const [N, setN] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMatrixData(M, N);
  };

  const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newX = Number(e.target.value);
    setXValue(newX);
  };

  return (
    <div className={styles.userInputContainer}>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <Input
          label="Кількість рядків (M):"
          id="M"
          type="number"
          value={M}
          onChange={(e) => setM(Number(e.target.value))}
          min="0"
          max="100"
        />
        <Input
          label="Кількість стовбців (N):"
          id="N"
          type="number"
          value={N}
          onChange={(e) => setN(Number(e.target.value))}
          min="0"
          max="100"
        />
        <Button type="submit">Згенерувати</Button>
      </form>

      <div className={styles.xInputGroup}>
        <Input
          label="Кількість ячєєк для підсвіування (X):"
          id="X"
          type="number"
          value={X}
          onChange={handleXChange}
          min="0"
        />
      </div>
    </div>
  );
};

export default UserInput;
