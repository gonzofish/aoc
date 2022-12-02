interface ValueFormatter<T> {
  (value: T): number;
}

export function sumInput(input: string) {
  return sum(input.split('\n'), (value: string) => parseInt(value, 10));
}

export function sum<T>(values: T[], formatValue: ValueFormatter<T> = formatDefault) {
  return values.reduce((total, value) => total + formatValue(value), 0);
}

function formatDefault<T>(value: T) {
  return Number(value);
}
