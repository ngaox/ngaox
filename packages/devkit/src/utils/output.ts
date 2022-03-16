import * as readline from 'readline';

export function clearCurrentLine() {
  readline.clearLine(process.stdout, 0); // clear current text
  readline.cursorTo(process.stdout, 0); // move cursor to beginning of line
}
