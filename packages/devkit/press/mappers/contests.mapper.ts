import { IParsedContent } from '../models/generic';
import { IPressMapper } from '../../src/builders';
import {
  cleanPath,
  omitKeys,
  titleCase,
  unlinkFile,
  writeJSON
} from '../../src/utils';

import * as path from 'path';
import { getContestManifest } from '../utils/contest-manifest';
import { getChallengeSubmissions } from '../utils/submissions';
import { MAP_FILES } from '../constants';
import { IAnnouncement, IChallenge, IContest } from '../models/contests';

const memory = {
  submissions: {},
  isChallengePartOfPeriodic: {},
  contests: {}
};

export function getContestsMapper(
  submissionsDir?: string,
  announcements: {
    [slug: string]: IAnnouncement;
  } = {}
): IPressMapper {
  const includeSubmissions = submissionsDir !== undefined;
  return {
    push: async (parsed: IParsedContent, filePath: string, extra) => {
      const slug = filePath.replace(/\.[^/.]+$/, '');
      const manifest = await getContestManifest(extra.options.dir, filePath);
      const contest = {} as IContest;
      const challenge: IChallenge = {
        date: (parsed.data.date as string) ?? '',
        duration: (parsed.data.duration as string) ?? 'Forever!',
        metadata: omitKeys(parsed.data, ['date', 'duration']),
        submissions: includeSubmissions
          ? await getChallengeSubmissions(slug, submissionsDir)
          : [],
        body: parsed.content
      };
      memory.submissions[slug] = challenge.submissions.map(item => [
        item.author,
        item.points
      ]);
      if (manifest !== undefined) {
        const contestSlug = cleanPath(path.dirname(slug));
        const editionSlug = cleanPath(path.basename(slug));
        contest.name = manifest.name ?? titleCase(slug);
        contest.slug = contestSlug;
        contest.summary = manifest.summary ?? '';
        contest['next'] = announcements[contestSlug];
        contest['editions'] = memory.contests[contestSlug]?.['editions'] ?? {};
        contest['editions'][editionSlug] = challenge.date;
        contest.metadata = omitKeys(manifest, ['name', 'summary']);

        memory.isChallengePartOfPeriodic[slug] = true;
        memory.contests[contestSlug] = contest;
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

        memory.isChallengePartOfPeriodic[slug] = false;
        memory.contests[slug] = contest;
      }

      await writeJSON(`${slug}.json`, challenge, {
        dir: extra.outputPath,
        logger: extra.context.logger
      });
      await writeMaps(extra.outputPath);
    },
    remove: async (filePath: string, extra) => {
      const slug = filePath.replace(/\.[^/.]+$/, '');
      const isPeriodic = memory.isChallengePartOfPeriodic[slug];
      delete memory.submissions[slug];
      if (isPeriodic) {
        const contestSlug = cleanPath(path.dirname(slug));
        const editionSlug = cleanPath(path.basename(slug));
        delete memory.contests[contestSlug].editions[editionSlug];
      } else {
        delete memory.contests[slug];
      }

      await unlinkFile(`${slug}.json`, {
        dir: extra.outputPath,
        logger: extra.context.logger
      });
      await writeMaps(extra.outputPath);
    }
  };
}

async function writeMaps(outputPath) {
  const outContentMap = Object.values(memory.contests).map(
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
    Object.values(memory.submissions) as [string, number][][]
  )
    .reduce((acc, curr) => acc.concat(curr), [])
    .reduce((acc, [author, points]) => {
      acc[author] = (acc[author] ?? 0) + points;
      return acc;
    }, {});
  await writeJSON(MAP_FILES.main, outContentMap, {
    dir: outputPath
  });
  await writeJSON(MAP_FILES.leaderboard, leaderboard, {
    dir: outputPath
  });
}
