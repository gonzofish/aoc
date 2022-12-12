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

  // check inner trees, starting at row[1] and ending at row[lastRowIndex - 1]
  for (let rowIndex = 1; rowIndex < lastRowIndex; rowIndex = rowIndex + 1) {
    const row = input[rowIndex];

    for (let colIndex = 1; colIndex < row.length - 1; colIndex = colIndex + 1) {
      const tree = input[rowIndex][colIndex];
      let isVisible = true;
      let checkRowIndex = 1;

      // VISIBLE FROM TOP?
      while (isVisible && checkRowIndex <= rowIndex) {
        const previousTree = input[checkRowIndex - 1][colIndex];

        if (previousTree >= tree) {
          isVisible = false;
        }

        checkRowIndex = checkRowIndex + 1;
      }

      if (isVisible) {
        visibleTrees = visibleTrees + 1;
        continue;
      }

      checkRowIndex = lastInnerRowIndex;
      isVisible = true;

      // VISIBLE FROM BOTTOM?
      while (isVisible && checkRowIndex >= rowIndex) {
        const previousTree = input[checkRowIndex + 1][colIndex];

        if (previousTree >= tree) {
          isVisible = false;
        }

        checkRowIndex = checkRowIndex - 1;
      }

      if (isVisible) {
        visibleTrees = visibleTrees + 1;
        continue;
      }

      let checkColIndex = 1;
      isVisible = true;

      // VISIBLE FROM LEFT?
      while (isVisible && checkColIndex <= colIndex) {
        const previousTree = input[rowIndex][checkColIndex - 1];

        if (previousTree >= tree) {
          isVisible = false;
        }

        checkColIndex = checkColIndex + 1;
      }

      if (isVisible) {
        visibleTrees = visibleTrees + 1;
        continue;
      }

      checkColIndex = row.length - 2;
      isVisible = true;

      // VISIBLE FROM RIGHT?
      while (isVisible && checkColIndex >= colIndex) {
        const previousTree = input[rowIndex][checkColIndex + 1];

        if (previousTree >= tree) {
          isVisible = false;
        }

        checkColIndex = checkColIndex - 1;
      }

      if (isVisible) {
        visibleTrees = visibleTrees + 1;
        continue;
      }
    }
  }

  console.info(visibleTrees);
}

measurePerf(run);
