export const templates = {
  packageJson: (name: string) => ({
    name,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    }
  }),

  indexHtml: `<!DOCTYPE html>
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
</html>`,

  indexHtmlWithTs: `<!DOCTYPE html>
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
</html>`,

  indexHtmlWithTailwind: `<!DOCTYPE html>
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
</html>`,

  indexHtmlWithTailwindAndTs: `<!DOCTYPE html>
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
</html>`,

  tsConfig: {
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
  },

  mainTs: `console.log('Hello from TypeScript!')`,

  viteConfig: `import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})`,

  tailwindConfig: `@import "tailwindcss";`,

  emptyCss: ``
} as const