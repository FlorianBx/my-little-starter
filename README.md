# @flbx/my-little-starter

A simple and fast CLI tool to bootstrap modern web projects with Vite, TypeScript, Vitest and Tailwind CSS support.

## Features

- ⚡️ **Vite** - Lightning fast development server
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS framework (with @tailwindcss/vite)
- 📝 **TypeScript** - Optional TypeScript support
- 🧪 **Vitest** - Optional Vitest support
- 📦 **pnpm** - Fast, disk space efficient package manager
- 🚀 **Zero config** - Start coding immediately

## Installation

Install globally using pnpm, yarn, or npm:

```bash
# pnpm
pnpm add -g @flbx/my-little-starter

# npm
npm install -g @flbx/my-little-starter

# yarn
yarn global add @flbx/my-little-starter

```

## Usage

Create a new project using the `mls` command:

```bash
mls my-awesome-project
```

### Options

- `--ts, --typescript` - Add TypeScript support
- `--tailwind` - Add Tailwind CSS v4 with Vite integration
- `--test` - Add Vitest support
- `-d, --directory <dir>` - Specify target directory (default: current directory)

### Examples

**Basic project:**

```bash
mls my-project
```

**TypeScript project:**

```bash
mls my-project --typescript
```

**Tailwind CSS project:**

```bash
mls my-project --tailwind
```

**Full-featured project with TypeScript, Vitest and Tailwind:**

```bash
mls my-project --ts --tw --test
```

**Create in a specific directory:**

```bash
mls my-project --directory ./projects
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
- **Secure** - Minimal dependencies, regular security audits

## Security

This package follows security best practices:

- 🔒 **Minimal Dependencies** - Only essential dependencies included
- 🛡️ **Regular Audits** - Automated security scanning
- 📋 **Vulnerability Reporting** - See [SECURITY.md](SECURITY.md)
- 🔍 **Supply Chain Security** - Verified package integrity

## License

MIT © [florianbx](mailto:creek-memoirs.4b@icloud.com)

## Contributing

Issues and PRs are welcome!
