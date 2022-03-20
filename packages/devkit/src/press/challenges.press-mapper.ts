import {
  IAnnouncement,
  IChallenge,
  IEdition,
  IParsedContent,
  IPeriodicChallenge,
  PERIODIC_MANIFEST,
  pressOuts,
  REVIEW_MANIFEST
} from './modals';
import { IMapperExtraOptions, IPressMapper } from '../modals/press';
import * as fs from 'fs-extra';
import * as path from 'path';
import { omitKeys } from '../utils/omit-keys';
import { cleanPath } from '../utils/generators-options';

type IChallengesMap = Array<IChallenge>;

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
  IChallenge
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
      const periodicManifestPath = path.join(
        extra.options.dir,
        path.dirname(filePath),
        PERIODIC_MANIFEST
      );
      const isPeriodic = await fileExists(periodicManifestPath);
      let challenge: IChallenge;
      let slug: string;
      const getEditionSubmissions = async () => {
        const slug = getSlug(undefined, filePath);
        const directory = path.join(submissionsDir, slug);
        const subDirs = (await dirExists(directory))
          ? (await fs.readdir(directory, { withFileTypes: true }))
              .filter(dirent => dirent.isDirectory())
              .map(dirent => dirent.name)
          : [];
        return await Promise.all(
          subDirs.map(async dirname => {
            const reviewFilePath = path.join(
              directory,
              dirname,
              REVIEW_MANIFEST
            );
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
      const edition: IEdition = {
        date: parsed.data.date ?? '',
        duration: parsed.data.duration ?? 'Forever!',
        body: parsed.content,
        metadata: {
          ...omitKeys(parsed.data, [
            'date',
            'duration',
            ...(isPeriodic ? [] : ['name', 'slug', 'summary'])
          ]),
          filePath
        },
        submissions: includeSubmissions ? await getEditionSubmissions() : []
      };
      if (isPeriodic) {
        const manifest = await fs.readJson(periodicManifestPath);
        slug = getSlug(manifest.slug, `${path.dirname(filePath)}.md`);
        const name =
          manifest.name ??
          (slug.replace(/-/g, ' ') as string).replace(/^\w/, c =>
            c.toUpperCase()
          );
        const manifestFile = cleanPath(
          path.relative(extra.options.dir, periodicManifestPath)
        );
        challenge = {
          name: name,
          slug: slug,
          summary: manifest.summary ?? '',
          next: announcements[slug],
          editions: [edition],
          metadata: {
            ...omitKeys(manifest, ['name', 'slug', 'summary']),
            manifestFile
          }
        };
      } else {
        slug = getSlug(parsed.data.slug, filePath);
        const name =
          parsed.data.name ??
          (slug.replace(/-/g, ' ') as string).replace(/^\w/, c =>
            c.toUpperCase()
          );
        challenge = {
          name: name,
          slug: slug,
          summary: parsed.data.summary ?? '',
          ...edition
        };
      }
      return [`${slug}.json`, challenge];
    },
    write: async (contentMap, extra: IMapperExtraOptions) => {
      await fs.writeJSON(
        path.join(extra.outputPath, pressOuts.map),
        contentMap.challenges.map(item => {
          return 'editions' in item
            ? {
                ...omitKeys(item, ['editions']),
                editions: item.editions.length,
                metadata: {
                  ...omitKeys(item.metadata, ['manifestFile'])
                }
              }
            : item;
        })
      );
      await fs.writeJSON(
        path.join(extra.outputPath, pressOuts.leaderboard),
        contentMap.leaderboard
      );
    },
    push: (previous, filePath, obj) => {
      const isPeriodic = 'editions' in obj;
      const manifestFile = cleanPath(
        path.join(path.dirname(filePath), PERIODIC_MANIFEST)
      );
      const editions =
        (
          previous.challenges.find(
            item => item.metadata.manifestFile === manifestFile
          ) as IPeriodicChallenge
        )?.editions ?? [];
      if (isPeriodic && obj.slug in announcements) {
        delete announcements[obj.slug];
      }
      return {
        ...previous,
        challenges: [
          ...previous.challenges.filter(
            findChallengeCallback(isPeriodic ? manifestFile : filePath, true)
          ),
          isPeriodic
            ? {
                ...obj,
                editions: [
                  ...editions.filter(
                    findChallengeCallback(
                      obj.editions[0].metadata.filePath,
                      true
                    )
                  ),
                  ...obj.editions
                ]
              }
            : obj
        ]
      };
    },
    remove: (previous, filePath: string) => {
      const challenge = previous.challenges.find(
        findChallengeCallback(filePath)
      );
      const isPeriodic = 'editions' in challenge;
      const outFilePath = `${challenge.slug}.json`;
      const leftItemsInChallenge = isPeriodic
        ? [
            {
              ...challenge,
              editions: challenge.editions.filter(
                findChallengeCallback(filePath, true)
              )
            }
          ]
        : [];
      if (isPeriodic && challenge.next) {
        announcements[challenge.slug] = challenge.next;
      }
      return [
        {
          ...previous,
          challenges: [
            ...previous.challenges.filter(
              findChallengeCallback(filePath, true)
            ),
            ...leftItemsInChallenge
          ]
        },
        outFilePath
      ];
    }
  };
}
async function fileExists(filePath: string) {
  return (await fs.pathExists(filePath)) && (await fs.stat(filePath)).isFile();
}
async function dirExists(filePath: string) {
  return (
    (await fs.pathExists(filePath)) && (await fs.stat(filePath)).isDirectory()
  );
}

function getSlug(slug?: string, filePath?: string) {
  return cleanPath(slug ?? filePath.replace(/\..+$/, '') ?? '');
}
function findChallengeCallback(filePath: string, reverseOutput = false) {
  return (item: IChallenge | IEdition) =>
    ('editions' in item
      ? item.metadata.manifestFile === filePath ||
        item.editions.some(edition => edition.metadata.filePath === filePath)
      : item.metadata.filePath === filePath) !== reverseOutput;
}
