# @flbx/my-little-starter

Fast CLI tool to bootstrap modern web projects with Vite, TypeScript, Tailwind CSS, Vitest, OxLint, and Prettier.

## Features

- Vite - Lightning fast development server
- Rolldown-Vite - Rust-powered bundler, future default for Vite (3-16x faster builds, currently in beta)
- Tailwind CSS v4 - Modern utility-first CSS framework
- TypeScript - Optional TypeScript support
- Vitest - Optional testing framework
- OxLint - Optional super-fast linter (50-100x faster than ESLint)
- Prettier - Optional code formatting with ES6+ optimized configuration
- pnpm - Fast package manager
- Zero config - Start coding immediately

## Installation

```bash
pnpm add -g @flbx/my-little-starter
```

## Usage

```bash
mls my-project
```

### Options

- `--ts, --typescript` - Add TypeScript support
- `--tailwind` - Add Tailwind CSS v4
- `--test` - Add Vitest support
- `--lint` - Add OxLint with configuration
- `--format` - Add Prettier with ES6+ optimized configuration
- `--rolldown` - Use Rolldown-Vite (Rust-powered bundler, future Vite default)
- `-d, --directory <dir>` - Target directory

### Examples

```bash
# Basic project
mls my-project

# TypeScript + Tailwind + Tests
mls my-project --ts --tailwind --test

# Full stack with linting and formatting
mls my-project --ts --tailwind --test --lint --format

# With experimental Rolldown bundler
mls my-project --rolldown --ts --tailwind

# Custom directory
mls my-project --directory ./projects
```

## Getting Started

```bash
cd my-project
pnpm dev
```

### Available Scripts

When you generate a project with optional tools, the following scripts are available:

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests (with `--test` flag)
- `pnpm lint` - Run OxLint (with `--lint` flag)
- `pnpm format` - Format code with Prettier (with `--format` flag)

## Requirements

- Node.js 16.0.0+
- pnpm

## License

MIT © [florianbx](mailto:creek-memoirs.4b@icloud.com)
