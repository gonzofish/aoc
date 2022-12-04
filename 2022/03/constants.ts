export const POINTS_LOOKUP = Array.from('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
  .reduce((lookup, letter, index) => ({
    ...lookup,
    [letter]: index + 1,
  }), {} as Record<string, number>);
