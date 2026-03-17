type BuildTuple<
  L extends number,
  T extends unknown[] = [],
> = T["length"] extends L ? T : BuildTuple<L, [...T, unknown]>;

type NumberRange<
  Start extends number,
  End extends number,
  Acc extends unknown[] = BuildTuple<Start>,
  Result extends number = never,
> = Acc["length"] extends End
  ? Result | End
  : NumberRange<Start, End, [...Acc, unknown], Result | Acc["length"]>;

export { type NumberRange };
