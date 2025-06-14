# @flbx/my-little-starter

A simple and fast CLI tool to bootstrap modern web projects with Vite, TypeScript, and Tailwind CSS support.

## Features

- ⚡️ **Vite** - Lightning fast development server
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS framework (with @tailwindcss/vite)
- 📝 **TypeScript** - Optional TypeScript support
- 📦 **pnpm** - Fast, disk space efficient package manager
- 🚀 **Zero config** - Start coding immediately

## Installation

Install globally using npm, yarn, or pnpm:

```bash
# npm
npm install -g @flbx/my-little-starter

# yarn
yarn global add @flbx/my-little-starter

# pnpm
pnpm add -g @flbx/my-little-starter
```

## Usage

Create a new project using the `create-mls` command:

```bash
create-mls my-awesome-project
```

### Options

- `--ts, --typescript` - Add TypeScript support
- `--tailwind` - Add Tailwind CSS v4 with Vite integration
- `-d, --directory <dir>` - Specify target directory (default: current directory)

### Examples

**Basic project:**

```bash
create-mls my-project
```

**TypeScript project:**

```bash
create-mls my-project --typescript
```

**Tailwind CSS project:**

```bash
create-mls my-project --tailwind
```

**Full-featured project with TypeScript and Tailwind:**

```bash
create-mls my-project --ts --tailwind
```

**Create in a specific directory:**

```bash
create-mls my-project --directory ./projects
```

## Project Structure

### Basic project

```
my-project/
├── index.html
├── styles.css
├── package.json
└── vite.config.js (if using Tailwind)
```

### With TypeScript

```
my-project/
├── index.html
├── styles.css
├── scripts/
│   └── main.ts
├── package.json
├── tsconfig.json
└── vite.config.js (if using Tailwind)
```

## Getting Started

After creating your project:

```bash
# Navigate to project directory
cd my-project

# Start development server
pnpm dev
```

Available scripts:

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## Requirements

- Node.js 16.0.0 or higher
- pnpm (will be used for package installation)

## Why My Little Starter?

- **Simple** - No complex configuration or boilerplate
- **Modern** - Uses latest tools and best practices
- **Fast** - Vite provides instant HMR and fast builds
- **Flexible** - Add only what you need

## License

MIT © [florian.bx](mailto:creek-memoirs.4b@icloud.com)

## Contributing

Issues and PRs are welcome!

## Changelog

### 1.0.0

- Initial release
- Vite integration
- TypeScript support
- Tailwind CSS v4 support with @tailwindcss/vite
