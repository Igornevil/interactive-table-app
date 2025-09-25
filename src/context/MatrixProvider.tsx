import React, { useState, useMemo, useCallback, useEffect } from "react";
import type { CellId, Matrix, MatrixContextType } from "./types";
import { createMatrix } from "../utils/data-generator";
import { MatrixContext } from "./MatrixContext";

interface MatrixProviderProps {
  children: React.ReactNode;
}

export const MatrixProvider: React.FC<MatrixProviderProps> = ({ children }) => {
  // Стани для контрольованих інпутів користувача
  const [inputM, setInputM] = useState<number>(0);
  const [inputN, setInputN] = useState<number>(0);
  const [X, setX] = useState<number>(3);

  // Основний стан додатку: матриця та UI-інтеракції
  const [matrix, setMatrix] = useState<Matrix>([]);
  const [hoveredCellId, setHoveredCellId] = useState<CellId | null>(null);
  const [hoveredSumRow, setHoveredSumRow] = useState<number | null>(null);
  const [nextId, setNextId] = useState<number>(0);
  const [regenerateTrigger, setRegenerateTrigger] = useState(false);

  // Похідні стани, що обчислюються з матриці
  const allCells = useMemo(() => matrix.flat(), [matrix]);
  const rowCount = matrix.length;
  const colCount = matrix[0]?.length || 0;

  // Ефект, що генерує нову матрицю при зміні тригера
  useEffect(() => {
    if (!regenerateTrigger) return;

    const { matrix: newMatrix, nextId: newNextId } = createMatrix(
      inputM,
      inputN
    );
    setMatrix(newMatrix);
    setNextId(newNextId);
    setRegenerateTrigger(false);
  }, [inputM, inputN, regenerateTrigger]);

  // Функції, що надаються контекстом для компонентів
  const setMatrixData = useCallback((m: number, n: number) => {
    setInputM(m);
    setInputN(n);
    setRegenerateTrigger(true);
  }, []);

  const setXValue = useCallback((x: number) => {
    setX(x);
  }, []);

  const incrementCellValue = useCallback((id: CellId) => {
    setMatrix((prevMatrix) =>
      prevMatrix.map((row) =>
        row.map((cell) =>
          cell.id === id ? { ...cell, amount: cell.amount + 1 } : cell
        )
      )
    );
  }, []);

  const addRow = useCallback(() => {
    if (inputN <= 0) return;
    const { matrix: newRowArray, nextId: newNextId } = createMatrix(
      1,
      inputN,
      nextId
    );
    setMatrix((prevMatrix) => [...prevMatrix, newRowArray[0]]);
    setNextId(newNextId);
  }, [inputN, nextId]);

  const removeRow = useCallback((rowIndex: number) => {
    setMatrix((prevMatrix) =>
      prevMatrix.filter((_, index) => index !== rowIndex)
    );
  }, []);

  // Обчислення X найближчих комірок до наведеної для теплової карти
  const nearestCellIds = useMemo(() => {
    const nearestMap = new Map<CellId, number>();
    if (X === 0 || !hoveredCellId || allCells.length <= 1) {
      return nearestMap;
    }
    const hoveredCell = allCells.find((cell) => cell.id === hoveredCellId);
    if (!hoveredCell) return nearestMap;

    const cellsWithDiff = allCells
      .filter((cell) => cell.id !== hoveredCellId)
      .map((cell) => ({
        id: cell.id,
        diff: Math.abs(cell.amount - hoveredCell.amount),
      }))
      .sort((a, b) => a.diff - b.diff);

    const nearest = cellsWithDiff.slice(0, X);
    if (nearest.length === 0) return nearestMap;

    const minDiff = nearest[0].diff;
    const maxDiff = nearest[nearest.length - 1].diff;
    const diffRange = maxDiff - minDiff;

    nearest.forEach(({ id, diff }) => {
      let intensity = 100;
      if (diffRange > 0) {
        intensity = 100 - Math.round(((diff - minDiff) / diffRange) * 100);
      }
      nearestMap.set(id, intensity);
    });

    return nearestMap;
  }, [allCells, X, hoveredCellId]);

  const value = useMemo<MatrixContextType>(
    () => ({
      matrix,
      X,
      rowCount,
      colCount,
      setMatrixData,
      setXValue,
      incrementCellValue,
      addRow,
      removeRow,
      hoveredCellId,
      setHoveredCellId,
      nearestCellIds,
      hoveredSumRow,
      setHoveredSumRow,
    }),
    [
      matrix,
      X,
      rowCount,
      colCount,
      setMatrixData,
      setXValue,
      incrementCellValue,
      addRow,
      removeRow,
      hoveredCellId,
      nearestCellIds,
      hoveredSumRow,
    ]
  );

  return (
    <MatrixContext.Provider value={value}>{children}</MatrixContext.Provider>
  );
};
