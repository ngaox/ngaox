import { logging } from '@angular-devkit/core';
import { colors } from '@angular-devkit/build-angular/src/utils/color';
import * as fs from 'fs-extra';
import * as path from 'path';
import { clearCurrentLine } from './output';

const greenCheckSymbol = colors.greenBright(colors.symbols.check);

export async function unlinkFile(
  filePath: string,
  options?: {
    dir?: string;
    logger?: logging.LoggerApi;
    message?: string;
  }
) {
  await fs.unlink(path.join(options.dir ?? '', filePath));
  if (options?.logger) {
    clearCurrentLine();
    options.logger.info(
      `${greenCheckSymbol} ${options?.message ?? `Removed: ${filePath}`}`
    );
  }
}
export async function writeFile(
  filePath: string,
  object: unknown,
  options?: {
    dir?: string;
    logger?: logging.LoggerApi;
    message?: string;
  }
) {
  const outFile = path.join(options.dir ?? '', filePath);
  await fs.ensureDir(path.dirname(outFile));
  await fs.writeJSON(outFile, object);
  if (options?.logger) {
    clearCurrentLine();
    options.logger.info(
      `${greenCheckSymbol} ${
        options?.message ?? `Writing "${filePath}" succeed!`
      }`
    );
  }
}

export async function fileExists(filePath: string) {
  return (await fs.pathExists(filePath)) && (await fs.stat(filePath)).isFile();
}
export async function dirExists(filePath: string) {
  return (
    (await fs.pathExists(filePath)) && (await fs.stat(filePath)).isDirectory()
  );
}
