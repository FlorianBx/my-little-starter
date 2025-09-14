export const templates = {
  packageJson: (name: string, options?: { lint?: boolean, format?: boolean, test?: boolean }) => {
    const scripts: Record<string, string> = {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    }
    
    if (options?.lint) {
      scripts.lint = 'oxlint'
    }
    
    if (options?.format) {
      scripts.format = 'prettier --write .'
    }
    
    if (options?.test) {
      scripts.test = 'vitest'
    }
    
    return {
      name,
      version: '1.0.0',
      type: 'module',
      scripts
    }
  },

  indexHtml: (hasTailwind: boolean = false, hasTypeScript: boolean = false) => {
    const bodyClass = hasTailwind ? ' class="bg-gray-950 text-white flex flex-col items-center justify-center min-h-screen"' : '';
    const h1Class = hasTailwind ? ' class="text-8xl font-bold text-emerald-300"' : '';
    const pClass = hasTailwind ? ' class="text-2xl text-gray-400"' : '';
    const script = hasTypeScript ? '  <script type="module" src="/src/main.ts"></script>\n' : '';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="/styles.css">
  <title>My Little Starter</title>
</head>
<body${bodyClass}>
  <main>
    <h1${h1Class}>Hello World</h1>
    <p${pClass}>Welcome to your starter project!</p>
  </main> 
${script}</body>
</html>`;
  },

  tsConfig: {
    compilerOptions: {
      target: 'ES2020',
      module: 'ESNext',
      lib: ['ES2020', 'DOM'],
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      noEmit: true,
      strict: true
    },
    include: ['scripts']
  },

  mainTs: `console.log('Hello from TypeScript!')`,

  viteConfig: `import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})`,

  tailwindConfig: `@import "tailwindcss";`,

  emptyCss: ``,

  oxlintConfig: {
    rules: {}
  },

  prettierConfig: {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'as-needed',
    trailingComma: 'all',
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'lf'
  },

  prettierIgnore: `node_modules
dist
build
*.min.js
*.min.css`
} as const
