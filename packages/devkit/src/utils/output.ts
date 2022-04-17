import * as readline from 'readline';
import { logging } from '@angular-devkit/core';
import { colors } from '@angular-devkit/build-angular/src/utils/color';

const greenCheckSymbol = colors.greenBright(colors.symbols.check);

export function logSuccess(logger: logging.LoggerApi, message: string) {
  clearCurrentLine();
  logger.info(`${greenCheckSymbol} ${message}`);
}

export function clearCurrentLine() {
  readline.clearLine(process.stdout, 0); // clear current text
  readline.cursorTo(process.stdout, 0); // move cursor to beginning of line
}
