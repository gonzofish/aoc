import { Stack } from './types';

export function setupStacks(stackDiagram: string) {
  const stacks: Stack[] = [];
  const upsideDown = stackDiagram.split('\n').slice(0, -1).reverse();

  for (const row of upsideDown) {
    const columns = row.match(/(\[[A-Z]\]|\s{3})\s?/g) || [];

    for (let i = 0; i < columns.length; i += 1) {
      const crate = columns[i].trim().replace(/(\[|\])/g, '');

      if (!stacks[i]) {
        stacks[i] = [];
      }

      if (crate) {
        stacks[i].push(crate);
      }
    }
  }

  return stacks;
}

export function moveCrates(
  stacks: Stack[],
  moves: string,
  moveGroup?: boolean
) {
  let newStacks = [...stacks];

  for (const move of moves.split('\n')) {
    const [numCrates, fromStackRaw, toStackRaw] = move
      .replace(/(move|from|to)\s/g, '')
      .split(' ')
      .map((value) => parseInt(value, 10));
    const fromStack = fromStackRaw - 1;
    const toStack = toStackRaw - 1;
    const crates = newStacks[fromStack].slice(-numCrates);

    if (!moveGroup) {
      crates.reverse();
    }

    newStacks[toStack].push(...crates);

    newStacks[fromStack] = newStacks[fromStack].slice(0, -numCrates);
  }

  return newStacks;
}

export function getCrateTops(stacks: Stack[]) {
  return stacks.map((stack) => stack[stack.length - 1]).join('');
}
