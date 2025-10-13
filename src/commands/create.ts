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

    if (options.lint) {
      await this.setupLint(projectPath)
    }

    if (options.format) {
      await this.setupFormat(projectPath)
    }
    
    await this.installDependencies(projectPath, options)
  }

  private async setupBase(projectPath: string, options: CreateOptions): Promise<void> {
    const packageJson = templates.packageJson(projectPath.split('/').pop()!, {
      lint: options.lint,
      format: options.format,
      test: options.test,
      rolldown: options.rolldown
    })

    await this.fileManager.writeFile(`${projectPath}/package.json`, JSON.stringify(packageJson, null, 2))
    await this.fileManager.writeFile(`${projectPath}/index.html`, templates.indexHtml(options.tailwind, options.typescript))
    await this.fileManager.writeFile(`${projectPath}/styles.css`, options.tailwind ? templates.tailwindConfig : templates.emptyCss)
  }

  private async setupTypescript(projectPath: string): Promise<void> {
    await this.fileManager.createDirectory(`${projectPath}/src`)
    await this.fileManager.writeFile(`${projectPath}/tsconfig.json`, JSON.stringify(templates.tsConfig, null, 2))
    await this.fileManager.writeFile(`${projectPath}/src/main.ts`, templates.mainTs)
  }

  private async setupTailwind(projectPath: string): Promise<void> {
    await this.fileManager.writeFile(`${projectPath}/vite.config.js`, templates.viteConfig)
  }

  private async setupTest(projectPath: string): Promise<void> {
    await this.fileManager.createDirectory(`${projectPath}/tests`)
  }

  private async setupLint(projectPath: string): Promise<void> {
    await this.fileManager.writeFile(`${projectPath}/.oxlintrc.json`, JSON.stringify(templates.oxlintConfig, null, 2))
  }

  private async setupFormat(projectPath: string): Promise<void> {
    await this.fileManager.writeFile(`${projectPath}/.prettierrc`, JSON.stringify(templates.prettierConfig, null, 2))
    await this.fileManager.writeFile(`${projectPath}/.prettierignore`, templates.prettierIgnore)
  }

  private async installDependencies(projectPath: string, options: CreateOptions): Promise<void> {
    const devDeps = []

    if (!options.rolldown) {
      devDeps.push('vite')
    }

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

    if (options.lint) {
      devDeps.push('oxlint')
    }

    if (options.format) {
      devDeps.push('prettier')
    }

    if (devDeps.length > 0) {
      await this.packageInstaller.install(projectPath, devDeps, true)
    }

    if (options.rolldown) {
      await this.packageInstaller.install(projectPath, ['vite'], false)
    }
  }
}
