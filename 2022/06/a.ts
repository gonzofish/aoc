import { loadInput, measurePerf, runMain } from "../helpers";
import { findStartMarker } from "./common";

const START_MARKER_SIZE = 4;

function run() {
  const input = loadInput(__dirname);

  console.info(findStartMarker(input, 4) + 1);
}

measurePerf(() => {
  runMain(run, module);
});
