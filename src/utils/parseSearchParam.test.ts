import { parseNumberSearchParam } from "@/utils/parseSearchParam";
import { describe, expect, test } from "bun:test";

describe("parseNumberSearchParam", () => {
  test("should return valid integers", () => {
    expect(parseNumberSearchParam("1")).toBe(1);
    expect(parseNumberSearchParam("5")).toBe(5);
    expect(parseNumberSearchParam("10")).toBe(10);
    expect(parseNumberSearchParam("100")).toBe(100);
  });

  test("should floor decimal numbers", () => {
    expect(parseNumberSearchParam("5.7")).toBe(5);
    expect(parseNumberSearchParam("10.9")).toBe(10);
    expect(parseNumberSearchParam("2.1")).toBe(2);
    expect(parseNumberSearchParam("99.99")).toBe(99);
  });

  test("should handle array of strings", () => {
    expect(parseNumberSearchParam(["12"])).toBe(12);
    expect(parseNumberSearchParam(["5", "10"])).toBe(5); // only first used
    expect(parseNumberSearchParam([])).toBeNull();
  });

  test("should return null for invalid values", () => {
    expect(parseNumberSearchParam(undefined)).toBeNull();
    expect(parseNumberSearchParam(null)).toBeNull();
    expect(parseNumberSearchParam("")).toBeNull();
    expect(parseNumberSearchParam("false")).toBeNull();
    expect(parseNumberSearchParam("true")).toBeNull();
    expect(parseNumberSearchParam("NaN")).toBeNull();
    expect(parseNumberSearchParam("Infinity")).toBeNull();
    expect(parseNumberSearchParam("-Infinity")).toBeNull();
    expect(parseNumberSearchParam("{}")).toBeNull();

    // negative numbers return null now
    expect(parseNumberSearchParam("-1")).toBeNull();
    expect(parseNumberSearchParam("-5")).toBeNull();
    expect(parseNumberSearchParam("-10.5")).toBeNull();

    // invalid strings
    expect(parseNumberSearchParam("abc")).toBeNull();
    expect(parseNumberSearchParam("not-a-number")).toBeNull();
    expect(parseNumberSearchParam("12abc")).toBeNull();
    expect(parseNumberSearchParam("abc123")).toBeNull();

    // whitespace
    expect(parseNumberSearchParam("   ")).toBeNull();
  });

  test("should parse numbers with whitespace", () => {
    expect(parseNumberSearchParam(" 5 ")).toBe(5);
    expect(parseNumberSearchParam("2 ")).toBe(2);
    expect(parseNumberSearchParam(" 11 ")).toBe(11);
    expect(parseNumberSearchParam(" 7")).toBe(7);
  });

  test("should handle very large numbers", () => {
    expect(parseNumberSearchParam("999999")).toBe(999999);
    expect(parseNumberSearchParam("1e10")).toBe(10000000000);
  });

  test("should handle string representations of numbers", () => {
    expect(parseNumberSearchParam("42")).toBe(42);
    expect(parseNumberSearchParam("007")).toBe(7);
  });
});
