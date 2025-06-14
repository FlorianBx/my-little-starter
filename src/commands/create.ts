import { CreateOptions } from './types.js'
import { FileManager } from '../utils/file-manager.js'
import { PackageInstaller } from '../utils/package-installer.js'

export class CreateCommand {
  private fileManager = new FileManager()
  private packageInstaller = new PackageInstaller()

  async execute(projectName: string, options: CreateOptions): Promise<void> {
    const projectPath = `${options.directory}/${projectName}`
    
    await this.fileManager.createDirectory(projectPath)
    await this.setupBase(projectPath)
    
    if (options.typescript) {
      await this.setupTypescript(projectPath)
    }
    
    if (options.tailwind) {
      await this.setupTailwind(projectPath, options.typescript)
    }
    
    await this.installDependencies(projectPath, options)
  }

  private async setupBase(projectPath: string): Promise<void> {
    const packageJson = {
      name: projectPath.split('/').pop(),
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview'
      }
    }

    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="/styles.css">
  <title>My Little Starter</title>
</head>
<body>
  <main>
      <h1>Hello World</h1>
      <p>Welcome to your starter project!</p>
    </main> 
</body>
</html>`

    await this.fileManager.writeFile(`${projectPath}/package.json`, JSON.stringify(packageJson, null, 2))
    await this.fileManager.writeFile(`${projectPath}/index.html`, indexHtml)
    await this.fileManager.writeFile(`${projectPath}/styles.css`, ``)
  }


  private async setupTypescript(projectPath: string): Promise<void> {
    const tsConfig = {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        module: 'ESNext',
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true
      },
      include: ['scripts']
    }

    const mainTs = `console.log('Hello from TypeScript!')`

    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="/styles.css">
  <title>My Little Starter</title>
</head>
<body>
  <main>
      <h1>Hello World</h1>
      <p>Welcome to your starter project!</p>
    </main> 
  <script type="module" src="/scripts/main.ts"></script>
</body>
</html>`

    await this.fileManager.createDirectory(`${projectPath}/scripts`)
    await this.fileManager.writeFile(`${projectPath}/tsconfig.json`, JSON.stringify(tsConfig, null, 2))
    await this.fileManager.writeFile(`${projectPath}/scripts/main.ts`, mainTs)
    await this.fileManager.writeFile(`${projectPath}/index.html`, indexHtml)
    await this.fileManager.writeFile(`${projectPath}/styles.css`, ``)
  }

  private async setupTailwind(projectPath: string, hasTypescript: boolean): Promise<void> {

    const viteConfig = `import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})`

    const tailwindConfig = `@import "tailwindcss";`

    const indexHtml = hasTypescript 
      ? `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="/styles.css">
  <title>My Little Starter</title>
</head>
  <body
    class="bg-gray-950 text-white flex flex-col items-center justify-center min-h-screen"
  >
    <main>
      <h1 class="text-8xl font-bold text-emerald-300">Hello World</h1>
      <p class="text-2xl text-gray-400">Welcome to your starter project!</p>
    </main> 
  <script type="module" src="/scripts/main.ts"></script>
</body>
</html>`
      : `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="/styles.css">
  <title>My Little Starter</title>
</head>
  <body
    class="bg-gray-950 text-white flex flex-col items-center justify-center min-h-screen"
  >
    <main>
      <h1 class="text-8xl font-bold text-emerald-300">Hello World</h1>
      <p class="text-2xl text-gray-400">Welcome to your starter project!</p>
    </main> 
</body>
</html>`

    await this.fileManager.writeFile(`${projectPath}/vite.config.js`, viteConfig)
    await this.fileManager.writeFile(`${projectPath}/index.html`, indexHtml)
    await this.fileManager.writeFile(`${projectPath}/styles.css`, tailwindConfig)
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

    await this.packageInstaller.install(projectPath, devDeps, true)
  }
}