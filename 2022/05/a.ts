import { loadInput, measurePerf, runMain } from '../helpers';
import { getCrateTops, moveCrates, setupStacks } from './common';

function run() {
  const [stackDiagram, moves] = loadInput().split('\n\n');
  const crates = setupStacks(stackDiagram);
  const result = moveCrates(crates, moves);

  console.info(getCrateTops(result));
}

measurePerf(() => runMain(run, module));
