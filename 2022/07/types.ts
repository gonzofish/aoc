export type Directory = {
  children: Directory[];
  label: string;
  parent?: Directory;
  size: number;
};
