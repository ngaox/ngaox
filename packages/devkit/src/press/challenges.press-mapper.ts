import {
  IAnnouncement,
  IChallenge,
  IChallengesMap,
  IEdition,
  IParsedContent,
  IPeriodicChallenge,
  ISingleChallenge,
  PERIODIC_MANIFEST,
  pressOuts
} from './modals';
import { IMapperExtraOptions, IPressMapper } from '../modals/press';
import * as fs from 'fs-extra';
import * as path from 'path';
import { omitKeys } from '../utils/omit-keys';
import { cleanPath } from '../utils/generators-options';
import { fileExists } from '../utils/filesystem';
import {
  ensureChallengeExists,
  findChallengeCallback,
  getEditionSubmissions,
  uniqueChallenges
} from '../utils/challenges-mapper-utils';
import { titleCase } from '../utils/strings';

export function getChallengesPressMapper(
  submissionsDir?: string,
  announcements: {
    [slug: string]: IAnnouncement;
  } = {}
): IPressMapper<
  {
    challenges: IChallengesMap;
    leaderboard: {
      [author: string]: number;
    };
  },
  IEdition | IChallenge
> {
  const includeSubmissions = submissionsDir !== undefined;
  return {
    empty: {
      challenges: [],
      leaderboard: {}
    },
    mapValues: async (
      curr,
      filePath: string,
      parsed: IParsedContent,
      extra: IMapperExtraOptions
    ) => {
      const slug = filePath.replace(/\.[^/.]+$/, '');
      const periodicManifestPath = path.join(
        extra.options.dir,
        path.dirname(filePath),
        PERIODIC_MANIFEST
      );
      const manifestFile = cleanPath(
        path.relative(extra.options.dir, periodicManifestPath)
      );
      const isPeriodic = await fileExists(periodicManifestPath);
      const challenge = ensureChallengeExists(
        curr.challenges,
        isPeriodic ? manifestFile : filePath
      );

      const edition: IEdition = {
        date: parsed.data.date ?? '',
        duration: parsed.data.duration ?? 'Forever!',
        body: parsed.content,
        metadata: {
          ...omitKeys(parsed.data, [
            'date',
            'duration',
            ...(isPeriodic ? [] : ['name', 'slug', 'summary'])
          ])
        },
        submissions: includeSubmissions
          ? await getEditionSubmissions(slug, submissionsDir)
          : []
      };
      if (isPeriodic) {
        const manifest = await fs.readJson(periodicManifestPath);
        const periodicSlug = cleanPath(path.dirname(slug));
        const editionSlug = cleanPath(path.basename(slug));
        challenge.name = manifest.name ?? titleCase(slug);
        challenge.slug = periodicSlug;
        challenge.summary = manifest.summary ?? '';
        (challenge as IPeriodicChallenge).next = announcements[periodicSlug];
        (challenge as IPeriodicChallenge).editions =
          (challenge as IPeriodicChallenge).editions ?? {};
        (challenge as IPeriodicChallenge).editions[editionSlug] = edition.date;
        challenge.metadata = {
          ...omitKeys(manifest, ['name', 'summary']),
          manifestFile
        };
        return [`${slug}.json`, edition];
      } else {
        challenge.name = parsed.data.name ?? titleCase(slug);
        challenge.name = parsed.data.name ?? titleCase(slug);
        challenge.slug = slug;
        challenge.summary = parsed.data.summary ?? '';
        challenge.metadata = edition.metadata;
        (challenge as ISingleChallenge).date = edition.date;
        (challenge as ISingleChallenge).duration = edition.duration;
        (challenge as ISingleChallenge).submissions = edition.submissions;
        (challenge as ISingleChallenge).body = edition.body;
      }
      return [`${slug}.json`, challenge as IChallenge];
    },
    write: async (contentMap, extra: IMapperExtraOptions) => {
      const outContentMap: any = contentMap.challenges.map(item => {
        if ('submissions' in item) {
          return {
            ...omitKeys(item, ['submissions', 'body']),
            metadata: {
              ...omitKeys(item.metadata, ['filePath']),
              submissionsNum: item?.submissions?.length ?? 0
            }
          };
        }
        if ('editions' in item) {
          return {
            ...item,
            metadata: omitKeys(item.metadata, ['manifestFile'])
          };
        }
        return omitKeys(item, ['body']);
      });
      for (let i = 0; i < outContentMap.length; i++) {
        const element = outContentMap[i];
        if ('editions' in element) {
          const outFile = `${path.join(extra.outputPath, element?.slug)}.json`;
          await fs.ensureDir(path.dirname(outFile));
          await fs.writeJson(outFile, element);
        }
      }
      await fs.writeJSON(
        path.join(extra.outputPath, pressOuts.map),
        outContentMap
      );
      await fs.writeJSON(
        path.join(extra.outputPath, pressOuts.leaderboard),
        contentMap.leaderboard
      );
    },
    push: previous => {
      return {
        ...previous,
        challenges: uniqueChallenges(previous.challenges)
      };
    },
    remove: (previous, filePath: string) => {
      const challenge = previous.challenges.find(
        findChallengeCallback(filePath)
      );
      const isPeriodic = 'editions' in challenge;
      const slug = filePath.replace(/\.[^/.]+$/, '');

      if (isPeriodic) {
        delete challenge.editions[slug];
      } else {
        previous.challenges = previous.challenges.filter(
          findChallengeCallback(filePath, true)
        );
      }

      return [previous, `${slug}.json`];
    }
  };
}
