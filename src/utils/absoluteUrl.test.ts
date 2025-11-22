import assert from "node:assert";
import { describe, it } from "node:test";
import { absoluteUrl } from "@/utils/absoluteUrl";

describe("absoluteUrl", () => {
  describe("development mode", () => {
    it("should generate correct URL for root path", () => {
      const result = absoluteUrl("/");
      assert.strictEqual(result, "http://localhost:7777");
    });

    it("should generate correct URL for simple path", () => {
      const result = absoluteUrl("/blogs");
      assert.strictEqual(result, "http://localhost:7777/blogs");
    });

    it("should remove trailing slash", () => {
      const result = absoluteUrl("/blogs/");
      assert.strictEqual(result, "http://localhost:7777/blogs");
    });

    it("should normalize duplicate slashes", () => {
      const result = absoluteUrl("/path//to//resource");
      assert.strictEqual(result, "http://localhost:7777/path/to/resource");
    });

    it("should handle multiple consecutive slashes", () => {
      const result = absoluteUrl("///path/to/resource");
      assert.strictEqual(result, "http://localhost:7777/path/to/resource");
    });

    it("should handle complex paths with multiple slashes", () => {
      const result = absoluteUrl("/api///v1//users///123");
      assert.strictEqual(result, "http://localhost:7777/api/v1/users/123");
    });

    it("should handle paths with query parameters", () => {
      const result = absoluteUrl("/search?q=test&page=1");
      assert.strictEqual(result, "http://localhost:7777/search?q=test&page=1");
    });

    it("should handle paths with hash fragments", () => {
      const result = absoluteUrl("/page#section");
      assert.strictEqual(result, "http://localhost:7777/page#section");
    });

    it("should handle paths with both query and hash", () => {
      const result = absoluteUrl("/page?query=1#section");
      assert.strictEqual(result, "http://localhost:7777/page?query=1#section");
    });
  });

  describe("edge cases", () => {
    it("should handle paths with encoded characters", () => {
      const result = absoluteUrl("/path%20with%20spaces");
      assert.strictEqual(result, "http://localhost:7777/path%20with%20spaces");
    });

    it("should handle paths with special characters", () => {
      const result = absoluteUrl("/path-with-dashes_and_underscores");
      assert.strictEqual(
        result,
        "http://localhost:7777/path-with-dashes_and_underscores",
      );
    });
  });
});
