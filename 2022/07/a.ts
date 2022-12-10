import { loadInput, runMain } from '../helpers';

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
  const input = loadInput(__dirname).split('\n');
  const machine = createDir('');
  let current: Directory = machine;
  let [line, ...otherLines] = input;

  while (line) {
    const match = line.match(commandRegex);

    if (match && match[2] === 'cd') {
      // cd
      if (match[3] === '..') {
        if (!current.parent) {
          throw Error('No parent?!');
        }

        current.parent.size += current.size;
        current = current.parent;
      } else {
        const dir = createDir(match[3], current);
        current.children.push(dir);
        current = dir;
      }
    } else if (match && match[1] === 'ls') {
      // ls
      let [listLine, ...otherListLines] = otherLines;

      while (listLine && !listLine.match(commandRegex)) {
        const fileMatch = listLine.match(/^(\d+)\s+.+$/);

        if (fileMatch) {
          current.size += parseInt(fileMatch[1], 10);
        }

        [listLine, ...otherListLines] = otherListLines;
      }

      otherLines = [listLine, ...otherListLines];
    } else {
      console.info(match);
      throw Error('Cannot understand command');
    }

    [line, ...otherLines] = otherLines;
  }

  console.info(findSizedDirs(machine.children, 100_000));
}

function createDir(label: string, parent?: Directory): Directory {
  return {
    children: [],
    label,
    parent,
    size: 0,
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

runMain(run, module);
