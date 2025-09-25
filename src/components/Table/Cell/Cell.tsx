import React, { useContext, useMemo } from "react";
import classNames from "classnames";
import type { Cell as CellType } from "../../../context/types";
import { MatrixContext } from "../../../context/MatrixContext";
import styles from "./Cell.module.scss";

interface CellProps {
  cell: CellType;
  isPercentView: boolean;
  maxInRow: number | null;
}

const Cell: React.FC<CellProps> = ({ cell, isPercentView, maxInRow }) => {
  const { incrementCellValue, setHoveredCellId, nearestCellIds } =
    useContext(MatrixContext);

  const nearestIntensity = nearestCellIds.get(cell.id);
  const isNearest = nearestIntensity !== undefined;

  const displayedValue = useMemo(() => {
    if (isPercentView && maxInRow) {
      const percentage = maxInRow > 0 ? (cell.amount / maxInRow) * 100 : 0;
      return `${percentage.toFixed(0)}%`;
    }
    return cell.amount;
  }, [isPercentView, cell.amount, maxInRow]);

  const percentIntensity = useMemo(() => {
    if (isPercentView && maxInRow && maxInRow > 0) {
      return Math.round((cell.amount / maxInRow) * 100);
    }
    return null;
  }, [isPercentView, cell.amount, maxInRow]);

  const tdClassName = classNames(styles.matrixCell, {
    [styles[`heatmap-blue-${nearestIntensity}`]]: isNearest,
    [styles[`heatmap-yellow-${percentIntensity}`]]:
      !isNearest && isPercentView && percentIntensity !== null,
  });

  return (
    <td
      className={tdClassName}
      onClick={() => incrementCellValue(cell.id)}
      onMouseEnter={() => setHoveredCellId(cell.id)}
      onMouseLeave={() => setHoveredCellId(null)}
    >
      {displayedValue}
    </td>
  );
};

export default React.memo(Cell);
