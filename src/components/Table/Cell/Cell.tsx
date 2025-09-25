import React, { useContext, useMemo } from "react";
import classNames from "classnames";
import type { Cell as CellType } from "../../../context/types";
import { MatrixContext } from "../../../context/MatrixContext";
import styles from "./Cell.module.scss";

interface CellProps {
  cell: CellType;
  isPercentView: boolean;
  sumInRow: number | null;
}

const Cell: React.FC<CellProps> = ({ cell, isPercentView, sumInRow }) => {
  // Отримуємо необхідні функції та дані з глобального контексту.
  const { incrementCellValue, setHoveredCellId, nearestCellIds } =
    useContext(MatrixContext);

  // Визначаємо, чи є поточна комірка однією з найближчих за значенням.
  const nearestIntensity = nearestCellIds.get(cell.id);
  const isNearest = nearestIntensity !== undefined;

  // Обчислюємо значення для відображення: або відсоток від суми, або абсолютне значення.
  const displayedValue = useMemo(() => {
    if (isPercentView && sumInRow !== null && sumInRow > 0) {
      const percentage = (cell.amount / sumInRow) * 100;
      return `${percentage.toFixed(0)}%`;
    }
    return cell.amount;
  }, [isPercentView, cell.amount, sumInRow]);

  // Обчислюємо "сиру" інтенсивність кольору у відсотках (0-100).
  const percentIntensity = useMemo(() => {
    if (isPercentView && sumInRow !== null && sumInRow > 0) {
      return Math.round((cell.amount / sumInRow) * 100);
    }
    return null;
  }, [isPercentView, cell.amount, sumInRow]);

  // Застосовуємо нелінійну функцію для візуального посилення градієнта.
  const easedPercentIntensity = useMemo(() => {
    if (percentIntensity === null) {
      return null;
    }
    const normalized = percentIntensity / 100;
    const eased = 1 - Math.pow(1 - normalized, 5);
    return Math.round(eased * 100);
  }, [percentIntensity]);

  // Динамічно формуємо рядок з CSS-класами для стилізації.
  const tdClassName = classNames(styles.matrixCell, {
    // Клас для синьої теплової карти (найближчі X).
    [styles[`heatmap-blue-${nearestIntensity}`]]: isNearest,
    // Клас для жовтої теплової карти (відсотки), застосовується, якщо синя не активна.
    [styles[`heatmap-yellow-${easedPercentIntensity}`]]:
      !isNearest && isPercentView && easedPercentIntensity !== null,
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
