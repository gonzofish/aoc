export function findStartMarker(signal: string, markerSize: number) {
  let marker = '';

  for (let i = 0; i < signal.length; i += 1) {
    const char = signal[i];
    const repeat = marker.indexOf(char);

    marker += char;

    if (repeat !== -1) {
      marker = marker.slice(repeat + 1);
    } else if (marker.length === markerSize) {
      return i;
    }
  }

  return -1;
}
