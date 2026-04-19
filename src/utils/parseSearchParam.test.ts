import { parseNumberSearchParam } from "@/utils/parseSearchParam";
import { describe, expect, test } from "bun:test";

describe("parseNumberSearchParam", () => {
  test("should return valid positive integers as-is", () => {
    expect(parseNumberSearchParam({ searchParam: "1", fallback: 1 })).toBe(1);
    expect(parseNumberSearchParam({ searchParam: "5", fallback: 1 })).toBe(5);
    expect(parseNumberSearchParam({ searchParam: "10", fallback: 1 })).toBe(10);
    expect(parseNumberSearchParam({ searchParam: "100", fallback: 1 })).toBe(
      100,
    );
  });

  test("should floor decimal numbers", () => {
    expect(parseNumberSearchParam({ searchParam: "5.7", fallback: 1 })).toBe(5);
    expect(parseNumberSearchParam({ searchParam: "10.9", fallback: 1 })).toBe(
      10,
    );
    expect(parseNumberSearchParam({ searchParam: "2.1", fallback: 1 })).toBe(2);
    expect(parseNumberSearchParam({ searchParam: "99.99", fallback: 1 })).toBe(
      99,
    );
  });

  test("should handle array of strings", () => {
    expect(parseNumberSearchParam({ searchParam: ["12"], fallback: 1 })).toBe(
      12,
    );
    expect(parseNumberSearchParam({ searchParam: ["0"], fallback: 1 })).toBe(1);
    expect(parseNumberSearchParam({ searchParam: [], fallback: 1 })).toBe(1);
    expect(
      parseNumberSearchParam({ searchParam: ["12", "131"], fallback: 1 }),
    ).toBe(1);
  });

  test("should return fallback for incorrect values", () => {
    expect(
      parseNumberSearchParam({ searchParam: undefined, fallback: 1 }),
    ).toBe(1);
    expect(parseNumberSearchParam({ searchParam: null, fallback: 1 })).toBe(1);
    expect(parseNumberSearchParam({ searchParam: "", fallback: 1 })).toBe(1);
    expect(parseNumberSearchParam({ searchParam: "0", fallback: 1 })).toBe(1);
    expect(parseNumberSearchParam({ searchParam: "false", fallback: 1 })).toBe(
      1,
    );
    expect(parseNumberSearchParam({ searchParam: "true", fallback: 1 })).toBe(
      1,
    );
    expect(parseNumberSearchParam({ searchParam: "NaN", fallback: 1 })).toBe(1);
    expect(
      parseNumberSearchParam({ searchParam: "Infinity", fallback: 1 }),
    ).toBe(1);
    expect(
      parseNumberSearchParam({ searchParam: "-Infinity", fallback: 1 }),
    ).toBe(1);
    expect(parseNumberSearchParam({ searchParam: [], fallback: 1 })).toBe(1);
    expect(parseNumberSearchParam({ searchParam: "{}", fallback: 1 })).toBe(1);

    // negative numbers
    expect(parseNumberSearchParam({ searchParam: "-1", fallback: 1 })).toBe(1);
    expect(parseNumberSearchParam({ searchParam: "-5", fallback: 1 })).toBe(1);
    expect(parseNumberSearchParam({ searchParam: "-10.5", fallback: 1 })).toBe(
      1,
    );

    // invalid strings
    expect(parseNumberSearchParam({ searchParam: "abc", fallback: 1 })).toBe(1);
    expect(
      parseNumberSearchParam({ searchParam: "not-a-number", fallback: 1 }),
    ).toBe(1);
    expect(parseNumberSearchParam({ searchParam: "12abc", fallback: 1 })).toBe(
      1,
    );
    expect(parseNumberSearchParam({ searchParam: "abc123", fallback: 1 })).toBe(
      1,
    );

    // whitespace strings
    expect(parseNumberSearchParam({ searchParam: "   ", fallback: 1 })).toBe(1);
  });

  test("should parse numbers with whitespace", () => {
    expect(parseNumberSearchParam({ searchParam: " 5 ", fallback: 1 })).toBe(5);
    expect(parseNumberSearchParam({ searchParam: "2 ", fallback: 1 })).toBe(2);
    expect(parseNumberSearchParam({ searchParam: " 11 ", fallback: 1 })).toBe(
      11,
    );
    expect(parseNumberSearchParam({ searchParam: " 7", fallback: 1 })).toBe(7);
  });

  test("should handle very large numbers", () => {
    expect(parseNumberSearchParam({ searchParam: "999999", fallback: 1 })).toBe(
      999999,
    );
    expect(parseNumberSearchParam({ searchParam: "1e10", fallback: 1 })).toBe(
      10000000000,
    );
  });

  test("should handle string representations of numbers", () => {
    expect(parseNumberSearchParam({ searchParam: "42", fallback: 1 })).toBe(42);
    expect(parseNumberSearchParam({ searchParam: "007", fallback: 1 })).toBe(7);
  });

  test("should respect custom fallback", () => {
    expect(parseNumberSearchParam({ searchParam: "abc", fallback: 5 })).toBe(5);
    expect(parseNumberSearchParam({ searchParam: "-10", fallback: 3 })).toBe(3);
  });
});
