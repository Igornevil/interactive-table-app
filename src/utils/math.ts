// import type { CellValue } from "../context/types";

// /**
//  * Calculates the sum of all values in an array of CellValues.
//  * @param rowValues An array of numbers representing the values in a row.
//  * @returns The sum of the values.
//  */
// export const calculateRowSum = (rowValues: CellValue[]): number => {
//   return rowValues.reduce((sum, value) => sum + value, 0);
// };

// /**
//  * Calculates the 60th percentile for a given column of values.
//  * The function sorts the data and uses linear interpolation for fractional ranks.
//  * @param columnValues An array of numbers representing the values in a column.
//  * @returns The calculated 60th percentile value, rounded to two decimal places.
//  */
// export const calculate60thPercentile = (columnValues: CellValue[]): number => {
//   if (columnValues.length === 0) {
//     return 0;
//   }

//   const sortedValues = [...columnValues].sort((a, b) => a - b);
//   const rank = 0.6 * (sortedValues.length + 1);

//   if (Number.isInteger(rank)) {
//     return sortedValues[rank - 1];
//   } else {
//     const lowerRank = Math.floor(rank);
//     const upperRank = Math.ceil(rank);
//     const lowerValue = sortedValues[lowerRank - 1];
//     const upperValue = sortedValues[upperRank - 1];
//     const interpolatedValue =
//       lowerValue + (rank - lowerRank) * (upperValue - lowerValue);

//     return parseFloat(interpolatedValue.toFixed(2));
//   }
// };

import type { CellValue } from "../context/types";

/**
 * Calculates the sum of all values in an array of CellValues.
 * @param rowValues An array of numbers representing the values in a row.
 * @returns The sum of the values.
 */
export const calculateRowSum = (rowValues: CellValue[]): number => {
  return rowValues.reduce((sum, value) => sum + value, 0);
};

/**
 * Calculates the 60th percentile for a given column of values.
 * The function sorts the data and uses linear interpolation for fractional ranks.
 * @param columnValues An array of numbers representing the values in a column.
 * @returns The calculated 60th percentile value, rounded to two decimal places.
 */
export const calculate60thPercentile = (columnValues: CellValue[]): number => {
  if (columnValues.length === 0) {
    return 0;
  }

  // ✅ ИСПРАВЛЕНО: Обработка случая с одним элементом
  if (columnValues.length === 1) {
    return columnValues[0];
  }

  const sortedValues = [...columnValues].sort((a, b) => a - b);
  const rank = 0.6 * (sortedValues.length + 1);

  if (Number.isInteger(rank)) {
    return sortedValues[rank - 1];
  } else {
    const lowerRank = Math.floor(rank);
    const upperRank = Math.ceil(rank);
    const lowerValue = sortedValues[lowerRank - 1];
    const upperValue = sortedValues[upperRank - 1];

    if (upperValue === undefined) {
      return lowerValue;
    }

    const interpolatedValue =
      lowerValue + (rank - lowerRank) * (upperValue - lowerValue);
    return parseFloat(interpolatedValue.toFixed(2));
  }
};
