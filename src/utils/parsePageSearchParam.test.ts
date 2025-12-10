import { describe, expect, test } from "bun:test";
import { parsePageSearchParam } from "@/utils/parsePageParam";

describe("parsePageSearchParam", () => {
  test("should return valid positive integers as-is", () => {
    expect(parsePageSearchParam("1")).toBe(1);
    expect(parsePageSearchParam("5")).toBe(5);
    expect(parsePageSearchParam("10")).toBe(10);
    expect(parsePageSearchParam("100")).toBe(100);
  });

  test("should floor decimal numbers", () => {
    expect(parsePageSearchParam("5.7")).toBe(5);
    expect(parsePageSearchParam("10.9")).toBe(10);
    expect(parsePageSearchParam("2.1")).toBe(2);
    expect(parsePageSearchParam("99.99")).toBe(99);
  });

  test("should handle array of strings", () => {
    expect(parsePageSearchParam([`12`])).toBe(12);
    expect(parsePageSearchParam([`0`])).toBe(1);
    expect(parsePageSearchParam([])).toBe(1);
    expect(parsePageSearchParam([`12`, "131"])).toBe(1);
  });

  test("should return 1 for incorrect values", () => {
    expect(parsePageSearchParam(undefined)).toBe(1);
    expect(parsePageSearchParam(null)).toBe(1);
    expect(parsePageSearchParam("")).toBe(1);
    expect(parsePageSearchParam("0")).toBe(1);
    expect(parsePageSearchParam("false")).toBe(1);
    expect(parsePageSearchParam(`true`)).toBe(1);
    expect(parsePageSearchParam(`NaN`)).toBe(1);
    expect(parsePageSearchParam(`Infinity`)).toBe(1);
    expect(parsePageSearchParam(`-Infinity`)).toBe(1);
    expect(parsePageSearchParam([])).toBe(1);
    expect(parsePageSearchParam(`{}`)).toBe(1);

    // negative numbers
    expect(parsePageSearchParam("-1")).toBe(1);
    expect(parsePageSearchParam("-5")).toBe(1);
    expect(parsePageSearchParam("-10.5")).toBe(1);

    // invalid strings
    expect(parsePageSearchParam("abc")).toBe(1);
    expect(parsePageSearchParam("not-a-number")).toBe(1);
    expect(parsePageSearchParam("12abc")).toBe(1);
    expect(parsePageSearchParam("abc123")).toBe(1);

    // whitespace strings
    expect(parsePageSearchParam("   ")).toBe(1);
  });

  test("should parse page from string with whitespace", () => {
    expect(parsePageSearchParam(" 5 ")).toBe(5);
    expect(parsePageSearchParam("2 ")).toBe(2);
    expect(parsePageSearchParam(" 11 ")).toBe(11);
    expect(parsePageSearchParam(" 7")).toBe(7);
  });

  test("should handle very large numbers", () => {
    expect(parsePageSearchParam("999999")).toBe(999999);
    expect(parsePageSearchParam("1e10")).toBe(10000000000);
  });

  test("should handle string representations of numbers", () => {
    expect(parsePageSearchParam("42")).toBe(42);
    expect(parsePageSearchParam("007")).toBe(7);
  });
});
