import { loadInput, measurePerf, runMain } from '../helpers';
import { checkOverlapRanges, getRanges } from './common';

type RangeBounds = [number, number];

function run() {
  const input = loadInput(__dirname).split('\n');
  let total = 0;

  for (const pair of input) {
    if (checkOverlapRanges(getRanges(pair), checkRangeOverlaps)) {
      total += 1;
    }
  }

  console.info(total);
}

function checkRangeOverlaps(range1: RangeBounds, range2: RangeBounds) {
  return (
    (range1[0] <= range2[0] && range1[1] >= range2[0]) ||
    (range1[0] >= range2[0] && range1[1] <= range2[0])
  );
}

measurePerf(() => runMain(run, module));
