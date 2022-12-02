import fs from 'fs';
import { loadInput, sum, sumInput } from '../helpers';

function run() {
  const input = loadInput(__dirname, true);
  const elfCalories = input.trim().split('\n\n');
  let top3 = [0, 0, 0];

  for (const foodCalories of elfCalories) {
    const total = sumInput(foodCalories);
    const greaterIndex = top3.findIndex((top) => top < total);

    if (greaterIndex !== -1) {
      top3 = [
        ...top3.slice(0, greaterIndex),
        total,
        ...top3.slice(greaterIndex),
      ].slice(0, 3);
    }
  }

  console.info(top3);
  console.info(sum(top3));
}

if (require.main === module) {
  run();
}
