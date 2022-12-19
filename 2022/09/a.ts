import { loadInput, measurePerf } from '../helpers';

interface Coords {
  x: number;
  y: number;
}
type Plane = keyof Coords;

function run() {
  const input = loadInput().split('\n');
  const head: Coords = {
    x: 0,
    y: 0,
  };
  const tail: Coords = {
    x: 0,
    y: 0,
  };
  const tailVisits = {
    [getCoordKey(tail)]: 1,
  };

  const moveTail = (primary: Plane, secondary: Plane, direction: number) => {
    const nextPrimary = head[primary] + direction;
    const nextSecondary =
      head[secondary] === tail[secondary] ? tail[secondary] : head[secondary];
    const change = Math.abs(nextPrimary - tail[primary]);

    for (let i = 1; i <= change; i = i + 1) {
      const coord: Coords = {
        x: 0,
        y: 0,
      };

      coord[primary] = tail[primary] - i * direction;
      coord[secondary] = nextSecondary;

      addTailVisit(coord);
    }

    tail[primary] = nextPrimary;
    tail[secondary] = nextSecondary;
  };

  const addTailVisit = (currentTail: Coords = tail) => {
    const tailCoords = getCoordKey(currentTail);

    tailVisits[tailCoords] = tailVisits[tailCoords] || 0;
    tailVisits[tailCoords] = tailVisits[tailCoords] + 1;
  };

  for (const line of input) {
    const [coordinate, spaces] = parseDirection(line);
    const direction = -(spaces / Math.abs(spaces));

    head[coordinate] = head[coordinate] + spaces;

    const xDistance = Math.abs(head.x - tail.x);
    const yDistance = Math.abs(head.y - tail.y);

    if (xDistance > 1) {
      moveTail('x', 'y', direction);
    } else if (yDistance > 1) {
      moveTail('y', 'x', direction);
    }
  }

  console.info(Object.keys(tailVisits).length);
}

function parseDirection(line: string): [Plane, number] {
  const [direction, spaces] = line.split(/\s+/);
  let coordinate: Plane = 'x';
  let numSpaces = parseInt(spaces, 10);

  if (direction === 'D' || direction === 'U') {
    coordinate = 'y';
  }

  if (direction === 'L' || direction === 'D') {
    numSpaces = -numSpaces;
  }

  return [coordinate, numSpaces];
}

function getCoordKey(coords: Coords) {
  return `${coords.x}, ${coords.y}`;
}

measurePerf(run);
