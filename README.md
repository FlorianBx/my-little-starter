# My Little Starter

My Little Starter is a simple project generator that helps you quickly set up a new project with optional TypeScript and Tailwind CSS support. It provides a command-line interface to create a project structure tailored to your needs.

## Features

- Create a new project with a customizable structure.
- Optionally include TypeScript support.
- Optionally include Tailwind CSS for styling.
- Easy to use command-line interface.

## Installation

To install My Little Starter globally, run:

```
npm install -g my-little-starter
```

## Usage

To create a new project, use the following command:

```
create-mls [project-name] [options]
```

### Options

- `--ts`, `--typescript`: Add TypeScript support.
- `--tailwind`: Add Tailwind CSS support.
- `-d`, `--directory <dir>`: Specify the target directory (default is the current directory).

### Example

To create a new project named "my-project" with TypeScript and Tailwind CSS support, run:

```
create-mls my-project --ts --tailwind
```

## Development

To build the project, run:

```
npm run build
```

To start the development mode with TypeScript watching for changes, run:

```
npm run dev
```

## Publishing

To publish the package to npm, ensure you have built the project and then run:

```
npm publish
```

## License

This project is licensed under the MIT License.