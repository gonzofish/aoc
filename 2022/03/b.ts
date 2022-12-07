import { loadInput, measurePerf, runMain } from '../helpers';
import { POINTS_LOOKUP } from './constants';

const GROUP_LENGTH = 3;

function run() {
  const input = loadInput(__dirname).split('\n');
  let total = 0;

  for (let i = 0; i < input.length; i += GROUP_LENGTH) {
    const commonItem = getCommonItem(input.slice(i, i + GROUP_LENGTH));

    if (commonItem === null || !POINTS_LOOKUP[commonItem]) {
      throw Error(
        `Could not find known common item in sacks ${i} - ${i + GROUP_LENGTH}`
      );
    }

    total += POINTS_LOOKUP[commonItem];
  }

  console.info(total);
}

function getCommonItem(group: string[]) {
  const itemCounts: Record<string, number> = {};

  for (let i = 0; i < GROUP_LENGTH; i += 1) {
    const sackUnique = new Set(group[i]);

    for (const item of sackUnique) {
      const itemCount = (itemCounts[item] || 0) + 1;

      // bow out early if an item meets the minimum number of items
      // to be common
      if (itemCount === GROUP_LENGTH) {
        return item;
      }

      itemCounts[item] = itemCount;
    }
  }

  return null;
}

measurePerf(() => runMain(run, module));
