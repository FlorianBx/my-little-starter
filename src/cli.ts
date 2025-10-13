import { Command } from 'commander'
import { CreateCommand } from './commands/create.js'
import { colors } from './utils/colors.js'

export function createCLI(): void {
  const createCommand = new CreateCommand()
  const program = new Command()

  program
    .name('create-mls')
    .description('My Little Starter - Simple project generator')
    .version('1.0.8')
    .argument('[project-name]', 'Project name', 'my-project')
    .option('--ts, --typescript', 'Add TypeScript support')
    .option('--tw, --tailwind', 'Add Tailwind CSS v4')
    .option('--test', 'Add Vitest')
    .option('--lint', 'Add OxLint')
    .option('--format', 'Add Prettier')
    .option('--rolldown', 'Use Rolldown-Vite (Rust-based, beta)')
    .option('-d, --directory <dir>', 'Target directory', '.')
    .action(async (projectName, options) => {
      try {
        console.log(colors.blue('Creating your project...'))
        
        await createCommand.execute(projectName, {
          typescript: options.typescript || false,
          tailwind: options.tailwind || false,
          test: options.test || false,
          lint: options.lint || false,
          format: options.format || false,
          rolldown: options.rolldown || false,
          directory: options.directory
        })
        
        console.log(colors.green('Project created successfully!'))
        console.log(colors.yellow(`cd ${projectName}`))
        console.log(colors.yellow('pnpm dev'))
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(colors.red('❌ Error:'), error.message)
        }
        process.exit(1)
      }
    })

  program.parse()
}
