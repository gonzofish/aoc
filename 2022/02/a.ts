import { loadInput, runMain } from '../helpers';
import { Matchup, RoundResult, Shape } from './types';

function run() {
  const input = loadInput(__dirname).split('\n');
  const shapeConvert: Record<RoundResult, Shape> = {
    X: 'A',
    Y: 'B',
    Z: 'C',
  };
  const shapePoints: Record<Shape, number> = {
    A: 1, // rock
    B: 2, // paper
    C: 3, // scissors
  };
  const winners = ['AB', 'BC', 'CA'];
  let total = 0;

  for (const round of input) {
    const [opponent, meRaw] = round.split(' ') as Matchup;
    const me = shapeConvert[meRaw];
    let roundPoints = 0;

    if (me === opponent) {
      roundPoints = 3;
    } else if (winners.includes(`${opponent}${me}`)) {
      roundPoints = 6;
    }

    total += roundPoints + shapePoints[me];
  }

  console.info(total);
}

runMain(run, module);
