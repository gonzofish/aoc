import { loadInput, measurePerf, runMain } from '../helpers';

const CHDIR = 'cd';
const LIST = 'ls';
const UP_DIR = '..';

const commandRegex = /^\$\s+((cd)\s*(.+)|(ls))\s*$/;

type Directory = {
  children: Directory[];
  label: string;
  parent?: Directory;
  size: number;
};

function run() {
  const input = loadInput(__dirname, true).split('\n');
  const machine = createDir('');
  let current: Directory = machine;
  let [line, ...remainingLines] = input;

  while (line) {
    const match = line.match(commandRegex);

    if (match && match[2] === 'cd') {
      current = changeDirectory(current, match[3]);
    } else if (match && match[1] === 'ls') {
      const listing = readListing(remainingLines);

      ({ remainingLines } = listing);
      current.size = current.size + listing.size;
    } else {
      throw Error('Cannot understand command');
    }

    [line, ...remainingLines] = remainingLines;
  }

  console.info(findSizedDirs(machine.children, 100_000));
}

// WARNING: this function will mutate `current`
function changeDirectory(current: Directory, label: string) {
  let next = current;

  if (label === '..') {
    next = moveUpDirectory(current);
  } else {
    next = moveIntoDir(current, label);
  }

  return next;
}

function moveUpDirectory(current: Directory) {
  if (!current.parent) {
    throw Error('No parent?!');
  }

  current.parent.size = current.parent.size + current.size;

  return current.parent;
}

function moveIntoDir(current: Directory, label: string) {
  const dir = createDir(label, current);

  current.children.push(dir);

  return dir;
}

function createDir(label: string, parent?: Directory): Directory {
  return {
    children: [],
    label,
    parent,
    size: 0,
  };
}

function readListing(lines: string[]) {
  let [listLine, ...otherListLines] = lines;
  let size = 0;

  while (listLine && !listLine.match(commandRegex)) {
    const fileMatch = listLine.match(/^(\d+)\s+.+$/);

    if (fileMatch) {
      size += parseInt(fileMatch[1], 10);
    }

    [listLine, ...otherListLines] = otherListLines;
  }

  return {
    remainingLines: [listLine, ...otherListLines],
    size,
  };
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
