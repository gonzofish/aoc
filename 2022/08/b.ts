import { loadInput, measurePerf } from '../helpers';

function run() {
  const input = loadInput(__dirname)
    .split('\n')
    .map((row) => row.split('').map((value) => parseInt(value, 10)));
  const lastRowIndex = input.length - 1;
  const lastInnerRowIndex = lastRowIndex - 1;
  let maxScenicScore = 1;

  // check inner trees, ignore the first and last row
  for (let rowIndex = 1; rowIndex < lastRowIndex; rowIndex = rowIndex + 1) {
    const row = input[rowIndex];

    // only check inner trees, ignore the first & last tree
    for (let colIndex = 1; colIndex < row.length - 1; colIndex = colIndex + 1) {
      const top = checkIsTopVisible(input, rowIndex, colIndex);
      const bottom = checkIsBottomVisible(
        input,
        rowIndex,
        colIndex,
        lastInnerRowIndex
      );
      const left = checkIsLeftVisible(input[rowIndex], colIndex);
      const right = checkIsRightVisible(
        input[rowIndex],
        colIndex,
        row.length - 2
      );
      const scenicScore = top * bottom * left * right;

      if (scenicScore > maxScenicScore) {
        maxScenicScore = scenicScore;
      }
    }
  }

  console.info(maxScenicScore);
}

function checkIsTopVisible(
  input: number[][],
  treeRow: number,
  treeCol: number
) {
  const tree = input[treeRow][treeCol];
  let rowIndex = treeRow - 1;
  let score = 0;

  while (rowIndex >= 0) {
    // comparison tree is in the same column but in a row above
    // the current tree
    const treeAbove = input[rowIndex][treeCol];

    score = score + 1;

    if (treeAbove >= tree) {
      break;
    }

    rowIndex = rowIndex - 1;
  }

  return score;
}

function checkIsBottomVisible(
  input: number[][],
  treeRow: number,
  treeCol: number,
  endAt: number
) {
  const tree = input[treeRow][treeCol];
  let rowIndex = treeRow + 1;
  let score = 0;

  while (rowIndex <= endAt + 1) {
    // comparison tree is in the same column but in a row below
    // the current tree
    const treeBelow = input[rowIndex][treeCol];

    score = score + 1;

    if (treeBelow >= tree) {
      break;
    }

    rowIndex = rowIndex + 1;
  }

  return score;
}

function checkIsLeftVisible(input: number[], treeCol: number) {
  const tree = input[treeCol];
  let colIndex = treeCol - 1;
  let score = 0;

  while (colIndex >= 0) {
    // comparison tree is in the same row but in a column to the left
    // of the current tree
    const treeToLeft = input[colIndex];

    score = score + 1;

    if (treeToLeft >= tree) {
      break;
    }

    colIndex = colIndex - 1;
  }

  return score;
}

function checkIsRightVisible(input: number[], treeCol: number, endAt: number) {
  const tree = input[treeCol];
  let colIndex = treeCol + 1;
  let score = 0;

  while (colIndex <= endAt + 1) {
    const treeToRight = input[colIndex];

    score = score + 1;

    if (treeToRight >= tree) {
      break;
    }

    colIndex = colIndex + 1;
  }

  return score;
}

measurePerf(run);
