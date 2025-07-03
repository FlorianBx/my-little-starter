# @flbx/my-little-starter

Fast CLI tool to bootstrap modern web projects with Vite, TypeScript, Tailwind CSS, and Vitest.

## Features

- Vite - Lightning fast development server
- Tailwind CSS v4 - Modern utility-first CSS framework
- TypeScript - Optional TypeScript support
- Vitest - Optional testing framework
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
- `-d, --directory <dir>` - Target directory

### Examples

```bash
# Basic project
mls my-project

# TypeScript + Tailwind + Tests
mls my-project --ts --tailwind --test

# Custom directory
mls my-project --directory ./projects
```

## Getting Started

```bash
cd my-project
pnpm dev
```

## Requirements

- Node.js 16.0.0+
- pnpm

## License

MIT © [florianbx](mailto:creek-memoirs.4b@icloud.com)
