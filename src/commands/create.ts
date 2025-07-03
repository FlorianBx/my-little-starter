import { CreateOptions } from './types.js'
import { FileManager } from '../utils/file-manager.js'
import { PackageInstaller } from '../utils/package-installer.js'
import { templates } from '../templates/index.js'

export class CreateCommand {
  private fileManager = new FileManager()
  private packageInstaller = new PackageInstaller()

  async execute(projectName: string, options: CreateOptions): Promise<void> {
    const projectPath = `${options.directory}/${projectName}`
    
    await this.fileManager.createDirectory(projectPath)
    await this.setupBase(projectPath, options)
    
    if (options.typescript) {
      await this.setupTypescript(projectPath)
    }
    
    if (options.tailwind) {
      await this.setupTailwind(projectPath)
    }

    if (options.test) {
      await this.setupTest(projectPath)
    }
    
    await this.installDependencies(projectPath, options)
  }

  private async setupBase(projectPath: string, options: CreateOptions): Promise<void> {
    const packageJson = templates.packageJson(projectPath.split('/').pop()!)

    await this.fileManager.writeFile(`${projectPath}/package.json`, JSON.stringify(packageJson, null, 2))
    await this.fileManager.writeFile(`${projectPath}/index.html`, templates.indexHtml(options.tailwind, options.typescript))
    await this.fileManager.writeFile(`${projectPath}/styles.css`, options.tailwind ? templates.tailwindConfig : templates.emptyCss)
  }

  private async setupTypescript(projectPath: string): Promise<void> {
    await this.fileManager.createDirectory(`${projectPath}/scripts`)
    await this.fileManager.writeFile(`${projectPath}/tsconfig.json`, JSON.stringify(templates.tsConfig, null, 2))
    await this.fileManager.writeFile(`${projectPath}/scripts/main.ts`, templates.mainTs)
  }

  private async setupTailwind(projectPath: string): Promise<void> {
    await this.fileManager.writeFile(`${projectPath}/vite.config.js`, templates.viteConfig)
  }

  private async setupTest(projectPath: string): Promise<void> {
    await this.fileManager.createDirectory(`${projectPath}/__tests__`)
  }

  private async installDependencies(projectPath: string, options: CreateOptions): Promise<void> {
    const devDeps = ['vite']
    
    if (options.typescript) {
      devDeps.push('typescript')
    }
    
    if (options.tailwind) {
      devDeps.push('tailwindcss')
      devDeps.push('@tailwindcss/vite')
    }
    
    if (options.test) {
      devDeps.push('vitest')
    }

    await this.packageInstaller.install(projectPath, devDeps, true)
  }
}
