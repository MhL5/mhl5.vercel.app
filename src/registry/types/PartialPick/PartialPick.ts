export type PartialPick<T, Key extends keyof T> = Partial<Pick<T, Key>> &
  Omit<T, Key>;
