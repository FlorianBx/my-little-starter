import { promises as fs } from 'node:fs'
import { dirname } from 'node:path'

export class FileManager {
  async createDirectory(path: string): Promise<void> {
    await fs.mkdir(path, { recursive: true })
  }

  async writeFile(path: string, content: string): Promise<void> {
    await fs.mkdir(dirname(path), { recursive: true })
    await fs.writeFile(path, content, 'utf-8')
  }

  async pathExists(path: string): Promise<boolean> {
    try {
      await fs.access(path)
      return true
    } catch {
      return false
    }
  }
}