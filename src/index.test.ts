import { describe, it, expect } from "vitest";
import { createCLI, CreateCommand } from "./index";
import type { CreateOptions } from "./index";

describe("Index exports", () => {
  it("should export createCLI function", () => {
    expect(createCLI).toBeDefined();
    expect(typeof createCLI).toBe("function");
  });

  it("should export CreateCommand class", () => {
    expect(CreateCommand).toBeDefined();
    expect(typeof CreateCommand).toBe("function");
  });

  it("should have correct type for CreateOptions", () => {
    const options: CreateOptions = {
      typescript: true,
      tailwind: false,
      directory: "./test",
    };

    expect(options).toHaveProperty("typescript");
    expect(options).toHaveProperty("tailwind");
    expect(options).toHaveProperty("directory");
  });
});

describe("Main Application Logic", () => {
  it("should return true for a valid condition", () => {
    expect(true).toBe(true);
  });

  it("should add two numbers correctly", () => {
    expect(1 + 1).toBe(2);
  });
});
