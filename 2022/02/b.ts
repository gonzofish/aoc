import { loadInput, runMain } from "../helpers";
import { Matchup, RoundResult, Shape } from "./types";

function run() {
  const input = loadInput(__dirname).split('\n');
  const shapePoints: Record<Shape, number> = {
    A: 1, // rock
    B: 2, // paper
    C: 3, // scissors
  };
  const roundPoints: Record<RoundResult, number> = {
    X: 0,
    Y: 3,
    Z: 6,
  };
  const plays: Record<RoundResult, Record<Shape, Shape>> = {
    X: { // lose
      A: 'C',
      B: 'A',
      C: 'B',
    },
    Y: { // draw
      A: 'A',
      B: 'B',
      C: 'C',
    },
    Z: { // win
      A: 'B',
      B: 'C',
      C: 'A',
    }
  };
  let total = 0;

  for (const round of input) {
    const [opponent, me] = round.split(' ') as Matchup;
    const myPlay = plays[me][opponent];

    total += roundPoints[me] + shapePoints[myPlay];
  }

  console.info(total);
}

runMain(run, module);
