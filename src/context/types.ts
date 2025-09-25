import type { Dispatch, SetStateAction } from "react";

export type CellId = number;
export type Cell = {
  id: CellId;
  amount: CellValue;
  row: number;
  col: number;
};
export type Matrix = Cell[][];
export type CellValue = number;

export type MatrixContextType = {
  matrix: Matrix;
  X: number;
  rowCount: number;
  colCount: number;
  nearestCellIds: Map<CellId, number>;
  hoveredCellId: CellId | null;
  hoveredSumRow: number | null;
  setMatrixData: (m: number, n: number) => void;
  setXValue: (x: number) => void;
  setHoveredCellId: Dispatch<SetStateAction<CellId | null>>;
  setHoveredSumRow: Dispatch<SetStateAction<number | null>>;
  incrementCellValue: (id: CellId) => void;
  addRow: () => void;
  removeRow: (rowIndex: number) => void;
};
