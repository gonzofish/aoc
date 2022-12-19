import { measurePerf, runMain } from '../helpers';
import { constructDirs } from './common';
import { Directory } from './types';

function run() {
  const machine = constructDirs();

  console.info(findSizedDirs(machine.children, 100_000));
}

function findSizedDirs(dirs: Directory[], maxSize: number) {
  let total = 0;

  for (let dir of dirs) {
    if (dir.size <= maxSize) {
      console.info(`${dir.label}: ${dir.size}`);
      total = total + dir.size;
    }

    if (dir.children.length) {
      total = total + findSizedDirs(dir.children, maxSize);
    }
  }

  return total;
}

measurePerf(() => runMain(run, module));
