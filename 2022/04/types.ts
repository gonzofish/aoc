export type RangeBounds = [number, number];
export interface CheckRangeContains {
  (range1: RangeBounds, range2: RangeBounds): boolean;
}
