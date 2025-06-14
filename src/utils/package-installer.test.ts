import { describe, it, expect, vi, beforeEach } from "vitest";
import { spawn } from "node:child_process";
import { PackageInstaller } from "./package-installer";

vi.mock("node:child_process", () => ({
  spawn: vi.fn(),
}));

describe("PackageInstaller", () => {
  let packageInstaller: PackageInstaller;
  let mockSpawn: any;
  let mockChildProcess: any;

  beforeEach(() => {
    packageInstaller = new PackageInstaller();

    mockChildProcess = {
      on: vi.fn(),
      stdout: { on: vi.fn() },
      stderr: { on: vi.fn() },
    };

    mockSpawn = vi.mocked(spawn).mockReturnValue(mockChildProcess as any);
    vi.clearAllMocks();
  });

  describe("install", () => {
    it("should install production dependencies", async () => {
      const projectPath = "/test/project";
      const packages = ["express", "dotenv"];

      mockChildProcess.on.mockImplementation(
        (event: string, callback: Function) => {
          if (event === "close") {
            callback(0);
          }
        }
      );

      await packageInstaller.install(projectPath, packages, false);

      expect(spawn).toHaveBeenCalledWith("pnpm", ["add", "express", "dotenv"], {
        cwd: projectPath,
        stdio: "inherit",
      });
    });

    it("should install dev dependencies with -D flag", async () => {
      const projectPath = "/test/project";
      const packages = ["vitest", "typescript", "@types/node"];

      mockChildProcess.on.mockImplementation(
        (event: string, callback: Function) => {
          if (event === "close") {
            callback(0);
          }
        }
      );

      await packageInstaller.install(projectPath, packages, true);

      expect(spawn).toHaveBeenCalledWith(
        "pnpm",
        ["add", "-D", "vitest", "typescript", "@types/node"],
        {
          cwd: projectPath,
          stdio: "inherit",
        }
      );
    });

    it("should handle empty package list", async () => {
      const projectPath = "/test/project";
      const packages: string[] = [];

      mockChildProcess.on.mockImplementation(
        (event: string, callback: Function) => {
          if (event === "close") {
            callback(0);
          }
        }
      );

      await packageInstaller.install(projectPath, packages, false);

      expect(spawn).toHaveBeenCalledWith("pnpm", ["add"], {
        cwd: projectPath,
        stdio: "inherit",
      });
    });

    it("should reject when installation fails with non-zero exit code", async () => {
      const projectPath = "/test/project";
      const packages = ["invalid-package"];

      mockChildProcess.on.mockImplementation(
        (event: string, callback: Function) => {
          if (event === "close") {
            callback(1);
          }
        }
      );

      await expect(
        packageInstaller.install(projectPath, packages, false)
      ).rejects.toThrow("Installation failed with code 1");
    });

    it("should handle different exit codes", async () => {
      const projectPath = "/test/project";
      const packages = ["package"];

      mockChildProcess.on.mockImplementation(
        (event: string, callback: Function) => {
          if (event === "close") {
            callback(127);
          }
        }
      );

      await expect(
        packageInstaller.install(projectPath, packages, false)
      ).rejects.toThrow("Installation failed with code 127");
    });

    it("should handle special characters in package names", async () => {
      const projectPath = "/test/project";
      const packages = ["@scope/package", "package@1.0.0"];

      mockChildProcess.on.mockImplementation(
        (event: string, callback: Function) => {
          if (event === "close") {
            callback(0);
          }
        }
      );

      await packageInstaller.install(projectPath, packages, false);

      expect(spawn).toHaveBeenCalledWith(
        "pnpm",
        ["add", "@scope/package", "package@1.0.0"],
        {
          cwd: projectPath,
          stdio: "inherit",
        }
      );
    });

    it("should handle paths with spaces", async () => {
      const projectPath = "/test/my project";
      const packages = ["package"];

      mockChildProcess.on.mockImplementation(
        (event: string, callback: Function) => {
          if (event === "close") {
            callback(0);
          }
        }
      );

      await packageInstaller.install(projectPath, packages, false);

      expect(spawn).toHaveBeenCalledWith("pnpm", ["add", "package"], {
        cwd: "/test/my project",
        stdio: "inherit",
      });
    });
  });
});
