import { loadInput, measurePerf, runMain } from "../helpers";
import { getCrateTops, moveCrates, setupStacks } from "./common";

function run() {
  const [stackDiagram, moves] = loadInput(__dirname).split('\n\n');
  const crates = setupStacks(stackDiagram);
  const result = moveCrates(crates, moves, true);

  console.info(getCrateTops(result));
}

measurePerf(() => runMain(run, module));
