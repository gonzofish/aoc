import fs from 'fs';
import { PerformanceObserver, performance } from 'node:perf_hooks';
import path from 'path';

interface ValueFormatter<T> {
  (value: T): number;
}

export function sumInput(input: string) {
  return sum(input.split('\n'), (value: string) => parseInt(value, 10));
}

export function sum<T>(
  values: T[],
  formatValue: ValueFormatter<T> = formatDefault
) {
  return values.reduce((total, value) => total + formatValue(value), 0);
}

function formatDefault<T>(value: T) {
  return Number(value);
}

export function loadInput() {
  const dir = require.main?.path;

  if (!dir) {
    throw Error('Could not identify a a main path to get input from!');
  }

  const test = process.argv.slice(2).includes('test');
  let filename = 'input';

  if (test) {
    console.log('⚠️ Using test data!');
    filename = `test_${filename}`;
  }

  const filepath = path.resolve(dir, filename);

  return fs.readFileSync(filepath, { encoding: 'utf8' }).trimEnd();
}

export function runMain(main: Function, mod: NodeModule) {
  if (require.main === mod) {
    main();
  }
}

export function measurePerf(fn: Function) {
  const obs = new PerformanceObserver((items) => {
    console.log('Took: %d ms', items.getEntries()[0].duration);
    performance.clearMarks();
  });
  obs.observe({ entryTypes: ['measure'] });

  performance.mark('Start');
  fn();
  performance.measure('Start to End', 'Start');
}
