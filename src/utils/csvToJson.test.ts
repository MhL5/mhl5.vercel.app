import { describe, expect, test } from "bun:test";

import { csvToJson } from "./csvToJson";

describe("csvToJson", () => {
  test("should parse and convert the csv correctly to match the expected output", () => {
    const csvString = `Type,Model,Material,Color,Size,Stock,,price,sale-price,Name
SP,TKO,LT,BLK,39,1,SP-TKO-LT-BLK-39,1470000,5880000,صندل طبی زنانه مدل توکیو
`;
    const expectedValue = [
      {
        Type: "SP",
        Model: "TKO",
        Material: "LT",
        Color: "BLK",
        Size: 39,
        Stock: 1,
        "": "SP-TKO-LT-BLK-39",
        price: 1470000,
        "sale-price": 5880000,
        Name: "صندل طبی زنانه مدل توکیو",
      },
    ];

    const result = csvToJson(csvString);
    expect(result).toEqual(expectedValue);
  });

  test("should handle multiple data rows correctly", () => {
    const csvString = `Name,Age,City
Alice,30,New York
Bob,25,Los Angeles
Charlie,35,Chicago`;
    const expectedValue = [
      { Name: "Alice", Age: 30, City: "New York" },
      { Name: "Bob", Age: 25, City: "Los Angeles" },
      { Name: "Charlie", Age: 35, City: "Chicago" },
    ];
    const result = csvToJson(csvString);
    expect(result).toEqual(expectedValue);
  });

  test("should ignore empty lines in the CSV", () => {
    const csvString = `Name,Age
Alice,30

Bob,25
`; // Note the empty line and trailing newline
    const expectedValue = [
      { Name: "Alice", Age: 30 },
      { Name: "Bob", Age: 25 },
    ];
    const result = csvToJson(csvString);
    expect(result).toEqual(expectedValue);
  });

  test("should handle different data types and empty cells", () => {
    const csvString = `ID,Value,Status,Count,IsEmpty
1,abc,active,5,false
2,,inactive,,true
3,xyz,active,10,false`;
    const expectedValue = [
      { ID: 1, Value: "abc", Status: "active", Count: 5, IsEmpty: "false" },
      { ID: 2, Value: "", Status: "inactive", Count: "", IsEmpty: "true" }, // "" becomes 0, "true" is not a number
      { ID: 3, Value: "xyz", Status: "active", Count: 10, IsEmpty: "false" },
    ];
    const result = csvToJson(csvString);
    expect(result).toEqual(expectedValue);
  });

  test("should return an empty array for an empty CSV string", () => {
    const csvString = "";
    const expectedValue: Record<string, unknown>[] = [];
    const result = csvToJson(csvString);
    expect(result).toEqual(expectedValue);
  });

  test("should return an empty array for a CSV with only a header row", () => {
    const csvString = "Header1,Header2,Header3";
    const expectedValue: Record<string, unknown>[] = [];
    const result = csvToJson(csvString);
    expect(result).toEqual(expectedValue);
  });

  test("should return an empty array for a CSV with only a header row and a newline", () => {
    const csvString = "Header1,Header2,Header3\n";
    const expectedValue: Record<string, unknown>[] = [];
    const result = csvToJson(csvString);
    expect(result).toEqual(expectedValue);
  });

  test("should handle lines with fewer values than headers", () => {
    const csvString = `Col1,Col2,Col3
Val1A,Val1B,Val1C
Val2A,Val2B`; // Missing value for Col3
    const expectedValue = [
      { Col1: "Val1A", Col2: "Val1B", Col3: "Val1C" },
      { Col1: "Val2A", Col2: "Val2B", Col3: "" },
    ];
    const result = csvToJson(csvString);
    expect(result).toEqual(expectedValue);
  });

  test("should ignore extra values in a line compared to headers", () => {
    const csvString = `Col1,Col2
Val1A,Val1B,ExtraValue`; // Extra value
    const expectedValue = [
      { Col1: "Val1A", Col2: "Val1B" }, // ExtraValue is ignored as there's no corresponding header
    ];
    const result = csvToJson(csvString);
    expect(result).toEqual(expectedValue);
  });
});
