export type StringWithAutoComplete<TOptions extends string> =
  | (string & {})
  | TOptions;

export type NumberWithAutoComplete<TOptions extends number> =
  | (number & {})
  | TOptions;
