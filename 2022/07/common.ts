import { loadInput } from '../helpers';
import { Directory } from './types';

const commandRegex = /^\$\s+((cd)\s*(.+)|(ls))\s*$/;

export function constructDirs(): Directory {
  const input = loadInput().split('\n');
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

  while (current !== machine) {
    // calculate the remaining size from where we are up to the machine
    current = moveUpDirectory(current);
  }

  return machine.children[0];
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
