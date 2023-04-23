import { IBuilder, IMapperExtraOptions } from '../../models/builder';
import {
  IAnnouncement,
  IChallenge,
  IContest,
  ISubmission
} from '../../models/builders/contests';
import { IMetaData, IParsedContent } from '../../models/builders/generic';
import { CONTENT_MAP_FILE, LEADERBOARD_PATH } from '../../models/constants';
import {
  dirExists,
  fileExists,
  unlinkFile,
  writeJSON
} from '../../utils/filesystem';
import { cleanPath, getCleanRelative } from '../../utils/generators-options';
import { omitKeys } from '../../utils/omit-keys';
import { titleCase } from '../../utils/strings';
import { basename, dirname, join as joinPaths } from 'path';
import { readJson, readdir } from 'fs-extra';
import { getTaskOutputPath } from '../helpers/filesystem';

const PERIODIC_MANIFEST = '~periodic.json';

export class ContestsBuilder implements IBuilder {
  memory = {
    submissions: {},
    isChallengePartOfPeriodic: {},
    contests: {}
  };

  constructor(
    private submissionsDir?: string,
    private announcements: { [slug: string]: IAnnouncement } = {}
  ) {}

  async push(
    parsed: IParsedContent,
    filePath: string,
    extra: IMapperExtraOptions
  ) {
    filePath = getCleanRelative(filePath, extra.options.dir);
    const slug = filePath.replace(/\.[^/.]+$/, '');
    const manifest = await getContestManifest(extra.options.dir, filePath);
    const contest = {} as IContest;
    const contestSlug =
      manifest !== undefined ? cleanPath(dirname(slug)) : slug;
    const challenge: IChallenge = {
      date: (parsed.data.date as string) ?? '',
      duration: (parsed.data.duration as string) ?? 'Forever!',
      metadata: omitKeys(parsed.data, ['date', 'duration']),
      submissions:
        this.submissionsDir !== undefined
          ? await getChallengeSubmissions(slug, this.submissionsDir)
          : [],
      body: parsed.content
    };
    this.memory.submissions[slug] = challenge.submissions.map(item => [
      item.author,
      item.points
    ]);
    const outputPath = getTaskOutputPath(extra);
    if (manifest !== undefined) {
      const editionSlug = cleanPath(basename(slug));
      contest.name = manifest.name ?? titleCase(slug);
      contest.slug = contestSlug;
      contest.summary = manifest.summary ?? '';
      contest['next'] = this.announcements[contestSlug];
      contest['editions'] =
        this.memory.contests[contestSlug]?.['editions'] ?? {};
      contest['editions'][editionSlug] = challenge.date;
      contest.metadata = omitKeys(manifest, ['name', 'summary']);

      this.memory.isChallengePartOfPeriodic[slug] = true;
      this.memory.contests[contestSlug] = contest;

      await writeJSON(`${slug}.json`, challenge, outputPath);
    } else {
      contest.name = (parsed.data.name as string) ?? titleCase(slug);
      contest.slug = slug;
      contest.summary = (parsed.data.summary as string) ?? '';
      contest.metadata = omitKeys(challenge.metadata, [
        'name',
        'slug',
        'summary'
      ]);
      contest['date'] = challenge.date;
      contest['duration'] = challenge.duration;
      contest['submissions'] = challenge.submissions;
      contest['body'] = challenge.body;

      this.memory.isChallengePartOfPeriodic[slug] = false;
      this.memory.contests[slug] = contest;
    }

    await writeJSON(`${contestSlug}.json`, contest, outputPath);
    await this.writeMaps(outputPath);
  }

  async remove(filePath: string, extra: IMapperExtraOptions) {
    filePath = getCleanRelative(filePath, extra.options.dir);
    const slug = filePath.replace(/\.[^/.]+$/, '');
    const isPeriodic = this.memory.isChallengePartOfPeriodic[slug];
    delete this.memory.submissions[slug];
    const outputPath = getTaskOutputPath(extra);
    if (isPeriodic) {
      const contestSlug = cleanPath(dirname(slug));
      const editionSlug = cleanPath(basename(slug));
      delete this.memory.contests[contestSlug].editions[editionSlug];
      await unlinkFile(`${contestSlug}.json`, outputPath);
    } else {
      delete this.memory.contests[slug];
    }
    await unlinkFile(`${slug}.json`, outputPath);
    await this.writeMaps(outputPath);
  }

  async writeMaps(outputPath) {
    const outContentMap = Object.values(this.memory.contests).map(
      (item: IContest) => ({
        ...omitKeys<IContest>(item, ['submissions', 'body']),
        metadata: {
          ...item.metadata,
          ...('submissions' in item
            ? { submissionsNumber: item.submissions.length }
            : {})
        }
      })
    );
    const leaderboard = (
      Object.values(this.memory.submissions) as [string, number][][]
    )
      .reduce((acc, curr) => acc.concat(curr), [])
      .reduce((acc, [author, points]) => {
        acc[author] = (acc[author] ?? 0) + points;
        return acc;
      }, {});
    await writeJSON(CONTENT_MAP_FILE, outContentMap, outputPath);
    await writeJSON(LEADERBOARD_PATH, leaderboard, outputPath);
  }
}

async function getContestManifest(dir: string, filePath: string) {
  const periodicManifestPath = joinPaths(
    dir,
    dirname(filePath),
    PERIODIC_MANIFEST
  );
  const isPeriodic = await fileExists(periodicManifestPath);
  if (isPeriodic) {
    const manifest = await readJson(periodicManifestPath);
    return manifest;
  }
  return undefined;
}

const getChallengeSubmissions = async (
  slug: string,
  submissionsDir: string
): Promise<ISubmission[]> => {
  const directory = joinPaths(submissionsDir, slug);
  const submissionFiles = (await dirExists(directory))
    ? (await readdir(directory, { withFileTypes: true }))
        .filter(dirent => dirent.isFile() && dirent.name.endsWith('.json'))
        .map(dirent => dirent.name)
    : [];
  return await Promise.all(
    submissionFiles.map(async filename => {
      const filePath = joinPaths(directory, filename);
      const metadata = (await fileExists(filePath))
        ? await readJson(filePath)
        : {};
      return {
        author: filename.replace(/\.json$/, ''),
        points: (metadata.points as number) ?? 0,
        path: cleanPath(joinPaths(slug, filename)),
        metadata: omitKeys<IMetaData>(metadata, ['points'])
      };
    })
  );
};
