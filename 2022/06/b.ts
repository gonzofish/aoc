import { loadInput, runMain } from '../helpers';
import { findStartMarker } from './common';

function run() {
  const input = loadInput(__dirname);

  console.info(findStartMarker(input, 14) + 1);
}

runMain(run, module);
