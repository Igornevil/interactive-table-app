import React, { useContext, useMemo } from "react";
import { MatrixContext } from "../../context/MatrixContext";
import { calculate60thPercentile } from "../../utils/math";
import Row from "./Row/Row";
import styles from "./Table.module.scss";
import Button from "../Button/Button";

const Table: React.FC = () => {
  const { matrix, colCount, addRow } = useContext(MatrixContext);

  const percentileValues = useMemo(() => {
    if (matrix.length === 0 || colCount === 0) return [];

    const percentiles = [];
    for (let j = 0; j < colCount; j++) {
      const columnValues = matrix.map((row) => row[j].amount);
      percentiles.push(calculate60thPercentile(columnValues));
    }
    return percentiles;
  }, [matrix, colCount]);

  if (matrix.length === 0) {
    return null;
  }

  return (
    <div className={styles.tableContainer}>
      <Button onClick={addRow}>Додати рядок</Button>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th></th>
              {Array.from({ length: colCount }, (_, i) => (
                <th key={i}>Стовбець {i + 1}</th>
              ))}
              <th>Сума</th>
              <th>Дія</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <Row key={row[0]?.id ?? rowIndex} row={row} rowIndex={rowIndex} />
            ))}
            <tr>
              <td className={styles.percentileHeader}>60-й процентиль</td>
              {percentileValues.map((value, index) => {
                return (
                  <td key={`p-${index}`} className={styles.percentileCell}>
                    {value}
                  </td>
                );
              })}
              <td className={styles.emptyCell}></td>
              <td className={styles.emptyCell}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(Table);
