import type { Cell, Matrix } from "../context/types";

let cellId = 0;

export const generateRandomCellValue = (): number => {
  return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
};

export const generateMatrixData = (M: number, N: number): Matrix => {
  const newMatrix: Matrix = [];
  cellId = 0;
  for (let i = 0; i < M; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < N; j++) {
      row.push({
        id: cellId++,
        amount: generateRandomCellValue(),
        row: i,
        col: j,
      });
    }
    newMatrix.push(row);
  }
  return newMatrix;
};

export const createMatrix = (
  M: number,
  N: number,
  startId: number = 0
): { matrix: Matrix; nextId: number } => {
  const newMatrix: Matrix = [];
  let currentId = startId;
  for (let i = 0; i < M; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < N; j++) {
      row.push({
        id: currentId++,
        amount: generateRandomCellValue(),
        row: i,
        col: j,
      });
    }
    newMatrix.push(row);
  }
  return { matrix: newMatrix, nextId: currentId };
};
