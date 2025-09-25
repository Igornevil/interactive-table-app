import React, { useContext, useMemo } from "react";
import { MatrixContext } from "../../../context/MatrixContext";
import { calculateRowSum } from "../../../utils/math";
import type { Cell as CellType } from "../../../context/types";
import Cell from "../Cell/Cell";
import Button from "../../Button/Button";
import styles from "./Row.module.scss";
import classNames from "classnames";

interface RowProps {
  row: CellType[];
  rowIndex: number;
}

const Row: React.FC<RowProps> = ({ row, rowIndex }) => {
  const { removeRow, setHoveredSumRow, hoveredSumRow } =
    useContext(MatrixContext);

  const isHovered = hoveredSumRow === rowIndex;

  const totalSum = useMemo(
    () => calculateRowSum(row.map((cell) => cell.amount)),
    [row]
  );

  return (
    <tr>
      <td className={styles.rowHeader}>Рядок {rowIndex + 1}</td>
      {row.map((cell) => (
        <Cell
          key={cell.id}
          cell={cell}
          isPercentView={isHovered}
          sumInRow={isHovered ? totalSum : null}
        />
      ))}
      <td
        className={classNames(styles.sumCell, { [styles.hovered]: isHovered })}
        onMouseEnter={() => setHoveredSumRow(rowIndex)}
        onMouseLeave={() => setHoveredSumRow(null)}
      >
        {totalSum}
      </td>
      <td className={styles.actionCell}>
        <Button onClick={() => removeRow(rowIndex)}>Видалити</Button>
      </td>
    </tr>
  );
};

export default React.memo(Row);
