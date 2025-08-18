export type AllOrNothing<T> = T | { [K in keyof T]?: never };
