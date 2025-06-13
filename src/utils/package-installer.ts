import { spawn } from 'node:child_process'

export class PackageInstaller {
  async install(projectPath: string, packages: string[], dev = false): Promise<void> {
    const args = ['add']
    if (dev) args.push('-D')
    args.push(...packages)

    return new Promise((resolve, reject) => {
      const child = spawn('pnpm', args, {
        cwd: projectPath,
        stdio: 'inherit'
      })

      child.on('close', (code) => {
        if (code === 0) {
          resolve()
        } else {
          reject(new Error(`Installation failed with code ${code}`))
        }
      })
    })
  }
}