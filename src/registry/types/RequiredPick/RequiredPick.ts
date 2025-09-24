export type RequiredPick<T, Key extends keyof T> = Required<Pick<T, Key>> & T;
