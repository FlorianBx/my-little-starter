import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateCommand } from "./create";
import { FileManager } from "../utils/file-manager";
import { PackageInstaller } from "../utils/package-installer";

vi.mock("../utils/file-manager");
vi.mock("../utils/package-installer");

describe("CreateCommand", () => {
  let createCommand: CreateCommand;
  let mockFileManager: any;
  let mockPackageInstaller: any;

  beforeEach(() => {
    mockFileManager = {
      createDirectory: vi.fn(),
      writeFile: vi.fn(),
      pathExists: vi.fn(),
    };
    mockPackageInstaller = {
      install: vi.fn(),
    };

    (FileManager as any).mockImplementation(() => mockFileManager);
    (PackageInstaller as any).mockImplementation(() => mockPackageInstaller);

    createCommand = new CreateCommand();
  });

  describe("execute", () => {
    it("should create a basic project without options", async () => {
      const projectName = "test-project";
      const options = {
        typescript: false,
        tailwind: false,
        directory: ".",
      };

      await createCommand.execute(projectName, options);

      expect(mockFileManager.createDirectory).toHaveBeenCalledWith(
        "./test-project"
      );
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./test-project/package.json",
        expect.stringContaining('"name": "test-project"')
      );
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./test-project/index.html",
        expect.stringContaining("<!DOCTYPE html>")
      );
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./test-project/styles.css",
        ""
      );
      expect(mockPackageInstaller.install).toHaveBeenCalledWith(
        "./test-project",
        ["vite"],
        true
      );
    });

    it("should create a TypeScript project", async () => {
      const projectName = "ts-project";
      const options = {
        typescript: true,
        tailwind: false,
        directory: "./projects",
      };

      await createCommand.execute(projectName, options);

      expect(mockFileManager.createDirectory).toHaveBeenCalledWith(
        "./projects/ts-project"
      );
      expect(mockFileManager.createDirectory).toHaveBeenCalledWith(
        "./projects/ts-project/scripts"
      );
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./projects/ts-project/tsconfig.json",
        expect.stringContaining('"target": "ES2020"')
      );
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./projects/ts-project/scripts/main.ts",
        expect.stringContaining("console.log('Hello from TypeScript!')")
      );
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./projects/ts-project/index.html",
        expect.stringContaining('src="/scripts/main.ts"')
      );
      expect(mockPackageInstaller.install).toHaveBeenCalledWith(
        "./projects/ts-project",
        ["vite", "typescript"],
        true
      );
    });

    it("should create a Tailwind CSS project", async () => {
      const projectName = "tailwind-project";
      const options = {
        typescript: false,
        tailwind: true,
        directory: ".",
      };

      await createCommand.execute(projectName, options);

      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./tailwind-project/vite.config.js",
        expect.stringContaining("@tailwindcss/vite")
      );
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./tailwind-project/styles.css",
        '@import "tailwindcss";'
      );
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./tailwind-project/index.html",
        expect.stringContaining('class="bg-gray-950')
      );
      expect(mockPackageInstaller.install).toHaveBeenCalledWith(
        "./tailwind-project",
        ["vite", "tailwindcss", "@tailwindcss/vite"],
        true
      );
    });

    it("should create a project with TypeScript and Tailwind", async () => {
      const projectName = "full-project";
      const options = {
        typescript: true,
        tailwind: true,
        directory: "./apps",
      };

      await createCommand.execute(projectName, options);

      expect(mockFileManager.createDirectory).toHaveBeenCalledWith(
        "./apps/full-project"
      );
      expect(mockFileManager.createDirectory).toHaveBeenCalledWith(
        "./apps/full-project/scripts"
      );
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./apps/full-project/tsconfig.json",
        expect.any(String)
      );
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./apps/full-project/vite.config.js",
        expect.any(String)
      );
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./apps/full-project/index.html",
        expect.stringContaining('src="/scripts/main.ts"')
      );
      expect(mockPackageInstaller.install).toHaveBeenCalledWith(
        "./apps/full-project",
        ["vite", "typescript", "tailwindcss", "@tailwindcss/vite"],
        true
      );
    });

    it("should handle special characters in project name", async () => {
      const projectName = "my-awesome-project_v2";
      const options = {
        typescript: false,
        tailwind: false,
        directory: ".",
      };

      await createCommand.execute(projectName, options);

      expect(mockFileManager.createDirectory).toHaveBeenCalledWith(
        "./my-awesome-project_v2"
      );
      expect(mockFileManager.writeFile).toHaveBeenCalledWith(
        "./my-awesome-project_v2/package.json",
        expect.stringContaining('"name": "my-awesome-project_v2"')
      );
    });

    it("should handle nested directory paths", async () => {
      const projectName = "nested-project";
      const options = {
        typescript: false,
        tailwind: false,
        directory: "./path/to/projects",
      };

      await createCommand.execute(projectName, options);

      expect(mockFileManager.createDirectory).toHaveBeenCalledWith(
        "./path/to/projects/nested-project"
      );
    });
  });
});
