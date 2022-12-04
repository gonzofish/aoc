import { loadInput, measurePerf, runMain, sum } from "../helpers";
import { POINTS_LOOKUP } from "./constants";

function run() {
  const input = loadInput(__dirname).split('\n');
  let total = 0;

  for (const sacks of input) {
    const mid = Math.ceil(sacks.length / 2);
    const sack1 = sacks.slice(0, mid);
    const sack2 = sacks.slice(mid);
    const sack1Items = new Set<string>(sack1);
    const commonItems = new Set<string>();
    let totalPoints = 0;

    for (const item of sack2) {
      if (sack1Items.has(item)) {
        commonItems.add(item);
      }
    }

    for (const item of commonItems) {
      totalPoints += POINTS_LOOKUP[item] || 0;
    }

    total += totalPoints;
  }

  console.info(total);
}

measurePerf(() => runMain(run, module));
