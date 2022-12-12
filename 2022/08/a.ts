import { loadInput, measurePerf } from '../helpers';

function run() {
  const input = loadInput(__dirname)
    .split('\n')
    .map((row) => row.split('').map((value) => parseInt(value, 10)));
  const lastRowIndex = input.length - 1;
  const lastInnerRowIndex = lastRowIndex - 1;
  let visibleTrees =
    input[0].length + // whole first row
    input[lastRowIndex].length + // whole last row
    lastInnerRowIndex * 2; // first and last of all other rows

  // check inner trees, ignore the first and last row
  for (let rowIndex = 1; rowIndex < lastRowIndex; rowIndex = rowIndex + 1) {
    const row = input[rowIndex];

    // only check inner trees, ignore the first & last tree
    for (let colIndex = 1; colIndex < row.length - 1; colIndex = colIndex + 1) {
      if (
        checkIsTopVisible(input, rowIndex, colIndex) ||
        checkIsBottomVisible(input, rowIndex, colIndex, lastInnerRowIndex) ||
        checkIsLeftVisible(input[rowIndex], colIndex) ||
        checkIsRightVisible(input[rowIndex], colIndex, row.length - 2)
      ) {
        visibleTrees = visibleTrees + 1;
      }
    }
  }

  console.info(visibleTrees);
}

function checkIsTopVisible(
  input: number[][],
  treeRow: number,
  treeCol: number
) {
  const tree = input[treeRow][treeCol];
  let rowIndex = 1;

  while (rowIndex <= treeRow) {
    // comparison tree is in the same column but in a row above
    // the current tree
    const treeAbove = input[rowIndex - 1][treeCol];

    if (treeAbove >= tree) {
      return false;
    }

    rowIndex = rowIndex + 1;
  }

  return true;
}

function checkIsBottomVisible(
  input: number[][],
  treeRow: number,
  treeCol: number,
  startAt: number
) {
  const tree = input[treeRow][treeCol];
  let rowIndex = startAt;

  while (rowIndex >= treeRow) {
    // comparison tree is in the same column but in a row below
    // the current tree
    const treeBelow = input[rowIndex + 1][treeCol];

    if (treeBelow >= tree) {
      return false;
    }

    rowIndex = rowIndex - 1;
  }

  return true;
}

function checkIsLeftVisible(input: number[], treeCol: number) {
  const tree = input[treeCol];
  let colIndex = 1;

  while (colIndex <= treeCol) {
    // comparison tree is in the same row but in a column to the left
    // of the current tree
    const treeToLeft = input[colIndex - 1];

    if (treeToLeft >= tree) {
      return false;
    }

    colIndex = colIndex + 1;
  }

  return true;
}

function checkIsRightVisible(
  input: number[],
  treeCol: number,
  startAt: number
) {
  const tree = input[treeCol];
  let colIndex = startAt;

  while (colIndex >= treeCol) {
    const treeToRight = input[colIndex + 1];

    if (treeToRight >= tree) {
      return false;
    }

    colIndex = colIndex - 1;
  }

  return true;
}

measurePerf(run);
