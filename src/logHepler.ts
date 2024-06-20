import chalk from "chalk";

export namespace LogHelper {
  export const log = console.log;
  export const error = console.error;
}

export namespace Style {
  export const error = chalk.bold.red;
  export const greenBG = chalk.bold.bgGreen;
  export const yellow = chalk.bold.yellow;
  export const errorbg = chalk.bold.bgRed;
}
