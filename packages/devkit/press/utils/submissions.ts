import { cleanPath, dirExists, fileExists } from '../../src/utils';

import * as path from 'path';
import * as fs from 'fs-extra';

import { omitKeys } from '../../src/utils';
import { IMetaData } from '../index.client';

export const getChallengeSubmissions = async (
  slug: string,
  submissionsDir: string
) => {
  const directory = path.join(submissionsDir, slug);
  const submissionFiles = (await dirExists(directory))
    ? (await fs.readdir(directory, { withFileTypes: true }))
        .filter(dirent => dirent.isFile() && dirent.name.endsWith('.json'))
        .map(dirent => dirent.name)
    : [];
  return await Promise.all(
    submissionFiles.map(async filename => {
      const filePath = path.join(directory, filename);
      const metadata = (await fileExists(filePath))
        ? await fs.readJson(filePath)
        : {};
      return {
        author: filename.replace(/\.json$/, ''),
        points: (metadata.points as number) ?? 0,
        path: cleanPath(path.join(slug, filename)),
        metadata: omitKeys<IMetaData>(metadata, ['points'])
      };
    })
  );
};
