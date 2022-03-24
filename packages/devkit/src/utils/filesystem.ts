import * as fs from 'fs-extra';

export async function fileExists(filePath: string) {
  return (await fs.pathExists(filePath)) && (await fs.stat(filePath)).isFile();
}
export async function dirExists(filePath: string) {
  return (
    (await fs.pathExists(filePath)) && (await fs.stat(filePath)).isDirectory()
  );
}
