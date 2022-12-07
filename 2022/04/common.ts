import { loadInput, measurePerf, runMain } from '../helpers';
import { CheckRangeContains, RangeBounds } from './types';

export function getRanges(rawSections: string) {
  const sections = rawSections.split(',');
  const ranges: Array<RangeBounds> = [];

  for (const rawRange of sections) {
    const [rawStart, rawEnd] = rawRange.split('-');
    const start = parseInt(rawStart, 10);
    const end = parseInt(rawEnd, 10);

    ranges.push([start, end]);
  }

  return ranges;
}

export function checkOverlapRanges(
  [range1, range2]: RangeBounds[],
  checkContainsRange: CheckRangeContains
) {
  return (
    checkContainsRange(range1, range2) || checkContainsRange(range2, range1)
  );
}
