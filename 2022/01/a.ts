import { loadInput, sumInput } from '../helpers';

function run() {
  const input = loadInput(__dirname);
  const elfCalories = input.trim().split('\n\n');
  let maxCalories = 0;

  for (const foodCalories of elfCalories) {
    const total = sumInput(foodCalories);

    if (total > maxCalories) {
      maxCalories = total;
    }
  }

  console.info(maxCalories);
}

if (require.main === module) {
  run();
}
