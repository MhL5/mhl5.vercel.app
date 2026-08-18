import { jsonToCsv } from "@/utils/jsonToCsv";
import { describe, expect, test } from "vitest";

describe("JsonToCsv", () => {
  test("should convert json data correctly to match the expected output", () => {
    const jsonData = [
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

    const expectedCsv = `Type,Model,Material,Color,Size,Stock,,price,sale-price,Name\r\n"SP","TKO","LT","BLK",39,1,"SP-TKO-LT-BLK-39",1470000,5880000,"صندل طبی زنانه مدل توکیو"`;

    const result = jsonToCsv({ data: jsonData });
    expect(result).toEqual(expectedCsv);
  });

  test("should handle multiple data rows correctly", () => {
    const jsonData = [
      { Name: "Alice", Age: 30, City: "New York" },
      { Name: "Bob", Age: 25, City: "Los Angeles" },
      { Name: "Charlie", Age: 35, City: "Chicago" },
    ];

    const expectedCsv = `Name,Age,City\r\n"Alice",30,"New York"\r\n"Bob",25,"Los Angeles"\r\n"Charlie",35,"Chicago"`;

    const result = jsonToCsv({ data: jsonData });
    expect(result).toEqual(expectedCsv);
  });

  test("should handle objects with different properties", () => {
    const jsonData = [
      { Name: "Alice", Age: 30 },
      { Name: "Bob", Age: 25, City: "Los Angeles" },
      { Name: "Charlie", City: "Chicago" },
    ];

    const expectedCsv = `Name,Age,City\r\n"Alice",30,""\r\n"Bob",25,"Los Angeles"\r\n"Charlie","","Chicago"`;

    const result = jsonToCsv({ data: jsonData });
    expect(result).toEqual(expectedCsv);
  });

  test("should handle different data types and null/undefined values", () => {
    const jsonData = [
      { ID: 1, Value: "abc", Status: "active", Count: 5, IsEmpty: false },
      {
        ID: 2,
        Value: null,
        Status: "inactive",
        Count: undefined,
        IsEmpty: true,
      },
      { ID: 3, Value: "xyz", Status: "active", Count: 10, IsEmpty: false },
    ];

    const expectedCsv = `ID,Value,Status,Count,IsEmpty\r\n1,"abc","active",5,false\r\n2,"","inactive","",true\r\n3,"xyz","active",10,false`;

    const result = jsonToCsv({ data: jsonData });
    expect(result).toEqual(expectedCsv);
  });

  test("should return an error message for an empty array", () => {
    const jsonData: Record<string, unknown>[] = [];

    const expectedCsv = "Data must be a non-empty array";

    const result = jsonToCsv({ data: jsonData });
    expect(result).toEqual(expectedCsv);
  });

  test("should return an error message for non-array input", () => {
    // @ts-expect-error Testing invalid input type
    const result = jsonToCsv({ data: "not an array" });

    expect(result).toEqual("Data must be a non-empty array");
  });

  test("should handle arrays with a single item", () => {
    const jsonData = [{ Name: "Single Item", Value: 42 }];

    const expectedCsv = `Name,Value\r\n"Single Item",42`;

    const result = jsonToCsv({ data: jsonData });
    expect(result).toEqual(expectedCsv);
  });

  test("should combine all unique keys from all objects", () => {
    const jsonData = [
      { a: 1, b: 2 },
      { b: 3, c: 4 },
      { a: 5, c: 6, d: 7 },
    ];

    const expectedCsv = `a,b,c,d\r\n1,2,"",""\r\n"",3,4,""\r\n5,"",6,7`;

    const result = jsonToCsv({ data: jsonData });
    expect(result).toEqual(expectedCsv);
  });

  test("should properly escape values with commas and quotes", () => {
    const jsonData = [
      { Name: "Alice, Smith", Description: 'She said "hello"' },
      { Name: 'Robert "Bob" Jones', Description: 'Comma, and "quotes"' },
    ];

    const expectedCsv = `Name,Description\r\n"Alice، Smith","She said \\"hello\\""\r\n"Robert \\"Bob\\" Jones","Comma، and \\"quotes\\""`;

    const result = jsonToCsv({ data: jsonData });
    expect(result).toEqual(expectedCsv);
  });

  test("should handle values with commas and quotes", () => {
    const jsonData = [
      {
        id: "67f93936b626701012c5153e",
        title: "blog form",
        description: `test,test"'`,
        status: "done",
        tasksUniqueId:
          "kafshMe-developer-tasks-8633f023-3231-4ffe-a4a3-5d9bcbf0a688",
        category: "both",
        tags: [],
        priority: "medium",
        createdAt: "2025-04-11T15:45:58.740Z",
        updatedAt: "2025-04-19T17:56:23.784Z",
      },
    ];
    const expectedCsv = `id,title,description,status,tasksUniqueId,category,tags,priority,createdAt,updatedAt\r\n"67f93936b626701012c5153e","blog form","test،test\\"'","done","kafshMe-developer-tasks-8633f023-3231-4ffe-a4a3-5d9bcbf0a688","both",[],"medium","2025-04-11T15:45:58.740Z","2025-04-19T17:56:23.784Z"`;

    const result = jsonToCsv({ data: jsonData });
    expect(result).toEqual(expectedCsv);
  });
});
