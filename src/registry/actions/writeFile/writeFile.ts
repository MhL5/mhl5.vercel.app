"use server";

import { isNode } from "@/registry/utils/checks/checks";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

const getDirPath = (...paths: string[]) => path.join(process.cwd(), ...paths);

async function writeFile(data: string, filename: `${string}.${string}`) {
  try {
    if (!isNode())
      throw new Error("This action is only available in Node.js runtime");

    const [name, extension] = filename.split(".");

    const tempDir = getDirPath("temp");

    // Ensure the temp directory exists
    try {
      await fs.mkdir(tempDir, { recursive: true });
    } catch (e) {
      // Ignore error if directory already exists
      if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
    }

    // Full path to the file
    const filePath = path.join(tempDir, `${name}-${randomUUID()}.${extension}`);

    // Write the data to the file
    await fs.writeFile(filePath, data, "utf8");

    // Return the full path
    return filePath;
  } catch (error) {
    throw new Error(
      `Failed to write temp file: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Writes data to a temporary file with a unique filename
 *
 * useful for writing big files to the file system like sitemap.xml and checking the output
 *
 * @param data - The content to write to the file
 * @param extension - The file extension (e.g., '.json', '.txt', '.js')
 * @returns The full path to the written file
 */
export async function writeTempFile(
  data: string,
  filename: `${string}.${string}`,
): Promise<string> {
  return writeFile(data, filename);
}
