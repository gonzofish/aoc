import { runMain } from '../helpers';
import { constructDirs } from './common';
import { Directory } from './types';

const UPDATE_SIZE = 30_000_000;
const MACHINE_SIZE = 70_000_000;

function run() {
  const machine = constructDirs();
  const unusedSpace = MACHINE_SIZE - machine.size;
  const neededSpace = UPDATE_SIZE - unusedSpace;

  console.log(findSmallestDir(machine, neededSpace));
}

function findSmallestDir(current: Directory, neededSpace: number) {
  let smallestDir = current;

  for (let dir of current.children) {
    if (dir.size >= neededSpace && dir.size < smallestDir.size) {
      smallestDir = dir;
    }
  }

  if (smallestDir !== current) {
    smallestDir = findSmallestDir(smallestDir, neededSpace);
  }

  return smallestDir;
}

runMain(run, module);
