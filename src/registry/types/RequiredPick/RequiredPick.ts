export type RequiredPick<T, key extends keyof T> = Required<Pick<T, key>> & T;
