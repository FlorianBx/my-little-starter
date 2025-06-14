import { program } from 'commander'
import { CreateCommand } from './commands/create.js'
import chalk from 'chalk'

export function createCLI(): void {
  const createCommand = new CreateCommand()

  program
    .name('create-mls')
    .description('My Little Starter - Simple project generator')
    .version('1.0.0')

  program
    .argument('[project-name]', 'Project name', 'my-project')
    .option('--ts, --typescript', 'Add TypeScript support')
    .option('--tw, --tailwind', 'Add Tailwind CSS v4')
    .option('-d, --directory <dir>', 'Target directory', '.')
    .action(async (projectName, options) => {
      try {
        console.log(chalk.blue('Creating your project...'))
        
        await createCommand.execute(projectName, {
          typescript: options.typescript || false,
          tailwind: options.tailwind || false,
          directory: options.directory
        })
        
        console.log(chalk.green('Project created successfully!'))
        console.log(chalk.yellow(`cd ${projectName}`))
        console.log(chalk.yellow('pnpm dev'))
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(chalk.red('❌ Error:'), error.message)
        }
        process.exit(1)
      }
    })

  program.parse()
}