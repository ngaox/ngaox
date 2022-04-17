import * as fs from 'fs-extra';
import * as path from 'path';

export async function fileExists(filePath: string) {
  return (await fs.pathExists(filePath)) && (await fs.stat(filePath)).isFile();
}

export async function dirExists(filePath: string) {
  return (
    (await fs.pathExists(filePath)) && (await fs.stat(filePath)).isDirectory()
  );
}

export async function writeJSON(
  filePath: string,
  object: unknown,
  dir?: string
) {
  return await writeFile(filePath, JSON.stringify(object), dir);
}

export async function writeFile(
  filePath: string,
  object: unknown,
  dir?: string
) {
  const outFile = path.join(dir ?? '', filePath);
  await fs.ensureDir(path.dirname(outFile));
  await fs.writeFile(outFile, object);
}

export async function unlinkFile(filePath: string, dir?: string) {
  await fs.unlink(path.join(dir ?? '', filePath));
}
