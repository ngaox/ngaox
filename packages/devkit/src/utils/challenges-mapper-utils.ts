import { dirExists, fileExists } from './filesystem';
import * as fs from 'fs-extra';
import * as path from 'path';
import { IChallenge, IMetaData, REVIEW_MANIFEST } from '../press/modals';
import { cleanPath } from './generators-options';

export const getEditionSubmissions = async (
  slug: string,
  submissionsDir: string
) => {
  const directory = path.join(submissionsDir, slug);
  const subDirs = (await dirExists(directory))
    ? (await fs.readdir(directory, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    : [];
  return await Promise.all(
    subDirs.map(async dirname => {
      const reviewFilePath = path.join(directory, dirname, REVIEW_MANIFEST);
      const review = (await fileExists(reviewFilePath))
        ? await fs.readJson(reviewFilePath)
        : {};
      return {
        author: dirname,
        path: cleanPath(path.join(slug, dirname)),
        review
      };
    })
  );
};

export function ensureChallengeExists(
  challenges: IChallenge[],
  filePath: string
) {
  const challenge = challenges.find(findChallengeCallback(filePath));
  if (!challenge) {
    const l = challenges.push({
      name: '',
      slug: '',
      summary: '',
      metadata: {}
    });
    return challenges[l - 1];
  }
  return challenge;
}

export function findChallengeCallback(filePath: string, reverseOutput = false) {
  return (item: IChallenge) =>
    ('editions' in item
      ? item.metadata.manifestFile === filePath
      : item.metadata.filePath === filePath) !== reverseOutput;
}

export function uniqueChallenges(challenges: IChallenge[]) {
  const seen: IMetaData = {};
  challenges = challenges.filter(function (entry) {
    let previous;

    if ('editions' in entry && entry.slug in seen) {
      // Yes, grab it and add this data to it
      previous = seen[entry.slug];
      previous.editions = {
        ...(previous.editions ?? {}),
        ...entry.editions
      };

      // Don't keep this entry, we've merged it into the previous one
      return false;
    }

    // Remember that we've seen it
    seen[entry.slug] = entry;

    // Keep this one, we'll merge any others that match into it
    return true;
  });

  return challenges;
}
