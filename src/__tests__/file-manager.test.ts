import { describe, it, expect, vi, beforeEach } from "vitest";
import { FileManager } from "../utils/file-manager.js";


vi.mock("node:fs", () => ({
  promises: {
    mkdir: vi.fn().mockResolvedValue(undefined),
    writeFile: vi.fn().mockResolvedValue(undefined),
    access: vi.fn(),
  },
}));

describe("FileManager", () => {
  let fileManager: FileManager;

  beforeEach(() => {
    fileManager = new FileManager();
    vi.clearAllMocks();
  });

  describe("createDirectory", () => {
    it("should create a directory with recursive option", async () => {
      const testPath = "/test/path/to/dir";
      const fs = await import("node:fs");

      await fileManager.createDirectory(testPath);

      expect(fs.promises.mkdir).toHaveBeenCalledWith(testPath, {
        recursive: true,
      });
    });

    it("should handle errors when creating directory", async () => {
      const testPath = "/invalid/path";
      const error = new Error("Permission denied");
      const fs = await import("node:fs");
      vi.mocked(fs.promises.mkdir).mockRejectedValueOnce(error);

      await expect(fileManager.createDirectory(testPath)).rejects.toThrow(
        "Permission denied"
      );
    });
  });

  describe("writeFile", () => {
    it("should create parent directories and write file", async () => {
      const filePath = "/test/dir/file.txt";
      const content = "Hello, World!";
      const fs = await import("node:fs");

      await fileManager.writeFile(filePath, content);

      expect(fs.promises.mkdir).toHaveBeenCalledWith("/test/dir", {
        recursive: true,
      });
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        filePath,
        content,
        "utf-8"
      );
    });

    it("should handle empty content", async () => {
      const filePath = "/test/empty.txt";
      const content = "";
      const fs = await import("node:fs");

      await fileManager.writeFile(filePath, content);

      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        filePath,
        content,
        "utf-8"
      );
    });

    it("should handle special characters in content", async () => {
      const filePath = "/test/special.txt";
      const content = '{"key": "value with émojis 🚀 and special chars: <>&"}';
      const fs = await import("node:fs");

      await fileManager.writeFile(filePath, content);

      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        filePath,
        content,
        "utf-8"
      );
    });

    it("should handle errors when writing file", async () => {
      const filePath = "/readonly/file.txt";
      const content = "test";
      const error = new Error("Read-only file system");
      const fs = await import("node:fs");

      vi.mocked(fs.promises.mkdir).mockResolvedValueOnce(undefined);
      vi.mocked(fs.promises.writeFile).mockRejectedValueOnce(error);

      await expect(fileManager.writeFile(filePath, content)).rejects.toThrow(
        "Read-only file system"
      );
    });
  });

  describe("pathExists", () => {
    it("should return true when path exists", async () => {
      const existingPath = "/existing/path";
      const fs = await import("node:fs");
      vi.mocked(fs.promises.access).mockResolvedValueOnce(undefined);

      const result = await fileManager.pathExists(existingPath);

      expect(result).toBe(true);
      expect(fs.promises.access).toHaveBeenCalledWith(existingPath);
    });

    it("should return false when path does not exist", async () => {
      const nonExistingPath = "/non/existing/path";
      const fs = await import("node:fs");
      vi.mocked(fs.promises.access).mockRejectedValueOnce(new Error("ENOENT"));

      const result = await fileManager.pathExists(nonExistingPath);

      expect(result).toBe(false);
      expect(fs.promises.access).toHaveBeenCalledWith(nonExistingPath);
    });

    it("should return false for any access error", async () => {
      const inaccessiblePath = "/inaccessible/path";
      const fs = await import("node:fs");
      vi.mocked(fs.promises.access).mockRejectedValueOnce(
        new Error("Permission denied")
      );

      const result = await fileManager.pathExists(inaccessiblePath);

      expect(result).toBe(false);
    });
  });
});
