export type PartialPick<T, key extends keyof T> = Partial<Pick<T, key>> &
  Omit<T, key>;
