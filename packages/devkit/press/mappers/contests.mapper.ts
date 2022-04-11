import { IParsedContent } from '../models/generic';
import { IPressMapper } from '../../src/builders';

export function getContestsMapper(): IPressMapper {
  return {
    push: async (parsed: IParsedContent, filePath: string, extra) => {
      //
    },
    remove: async (filePath: string, extra) => {
      //
    }
  };
}

// import {
//   IAnnouncement,
//   IChallenge,
//   IChallengesMap,
//   IEdition,
//   IPeriodicChallenge,
//   ISingleChallenge,
//   PERIODIC_MANIFEST,
//   pressOuts
// } from './models';
// import {
//   IMapperExtraOptions,
//   IPressMapper,
//   IParsedContent
// } from '../builders/models/press';
// import * as fs from 'fs-extra';
// import * as path from 'path';
// import { omitKeys } from '../utils/omit-keys';
// import { cleanPath } from '../utils/generators-options';
// import { fileExists } from '../utils/filesystem';
// import {
//   ensureChallengeExists,
//   findChallengeCallback,
//   getEditionSubmissions,
//   uniqueChallenges
// } from '../utils/challenges-mapper-utils';
// import { titleCase } from '../utils/strings';

// export function getChallengesPressMapper(
//   submissionsDir?: string,
//   announcements: {
//     [slug: string]: IAnnouncement;
//   } = {}
// ): IPressMapper<
//   {
//     challenges: IChallengesMap;
//     leaderboard: {
//       [author: string]: number;
//     };
//   },
//   IEdition | IChallenge
// > {
//   const includeSubmissions = submissionsDir !== undefined;
//   return {
//     empty: {
//       challenges: [],
//       leaderboard: {}
//     },
//     mapValues: async (
//       curr,
//       filePath: string,
//       parsed: IParsedContent,
//       extra: IMapperExtraOptions
//     ) => {
//       const slug = filePath.replace(/\.[^/.]+$/, '');
//       const periodicManifestPath = path.join(
//         extra.options.dir,
//         path.dirname(filePath),
//         PERIODIC_MANIFEST
//       );
//       const manifestFile = cleanPath(
//         path.relative(extra.options.dir, periodicManifestPath)
//       );
//       const isPeriodic = await fileExists(periodicManifestPath);
//       const challenge = ensureChallengeExists(
//         curr.challenges,
//         isPeriodic ? manifestFile : filePath
//       );

//       const edition: IEdition = {
//         date: parsed.data.date ?? '',
//         duration: parsed.data.duration ?? 'Forever!',
//         body: parsed.content,
//         metadata: {
//           ...omitKeys(parsed.data, [
//             'date',
//             'duration',
//             ...(isPeriodic ? [] : ['name', 'slug', 'summary'])
//           ])
//         },
//         submissions: includeSubmissions
//           ? await getEditionSubmissions(slug, submissionsDir)
//           : []
//       };
//       if (isPeriodic) {
//         const manifest = await fs.readJson(periodicManifestPath);
//         const periodicSlug = cleanPath(path.dirname(slug));
//         const editionSlug = cleanPath(path.basename(slug));
//         challenge.name = manifest.name ?? titleCase(slug);
//         challenge.slug = periodicSlug;
//         challenge.summary = manifest.summary ?? '';
//         (challenge as IPeriodicChallenge).next = announcements[periodicSlug];
//         (challenge as IPeriodicChallenge).editions =
//           (challenge as IPeriodicChallenge).editions ?? {};
//         (challenge as IPeriodicChallenge).editions[editionSlug] = edition.date;
//         challenge.metadata = {
//           ...omitKeys(manifest, ['name', 'summary']),
//           manifestFile
//         };
//         return [`${slug}.json`, edition];
//       } else {
//         challenge.name = parsed.data.name ?? titleCase(slug);
//         challenge.name = parsed.data.name ?? titleCase(slug);
//         challenge.slug = slug;
//         challenge.summary = parsed.data.summary ?? '';
//         challenge.metadata = edition.metadata;
//         (challenge as ISingleChallenge).date = edition.date;
//         (challenge as ISingleChallenge).duration = edition.duration;
//         (challenge as ISingleChallenge).submissions = edition.submissions;
//         (challenge as ISingleChallenge).body = edition.body;
//       }
//       return [`${slug}.json`, challenge as IChallenge];
//     },
//     write: async (contentMap, extra: IMapperExtraOptions) => {
//       const outContentMap: any = contentMap.challenges.map(item => {
//         if ('submissions' in item) {
//           return {
//             ...omitKeys(item, ['submissions', 'body']),
//             metadata: {
//               ...omitKeys(item.metadata, ['filePath']),
//               submissionsNum: item?.submissions?.length ?? 0
//             }
//           };
//         }
//         if ('editions' in item) {
//           return {
//             ...item,
//             metadata: omitKeys(item.metadata, ['manifestFile'])
//           };
//         }
//         return omitKeys(item, ['body']);
//       });
//       for (let i = 0; i < outContentMap.length; i++) {
//         const element = outContentMap[i];
//         if ('editions' in element) {
//           const outFile = `${path.join(extra.outputPath, element?.slug)}.json`;
//           await fs.ensureDir(path.dirname(outFile));
//           await fs.writeJson(outFile, element);
//         }
//       }
//       await fs.writeJSON(
//         path.join(extra.outputPath, pressOuts.map),
//         outContentMap
//       );
//       await fs.writeJSON(
//         path.join(extra.outputPath, pressOuts.leaderboard),
//         contentMap.leaderboard
//       );
//     },
//     push: previous => {
//       return {
//         ...previous,
//         challenges: uniqueChallenges(previous.challenges)
//       };
//     },
//     remove: (previous, filePath: string) => {
//       const challenge = previous.challenges.find(
//         findChallengeCallback(filePath)
//       );
//       const isPeriodic = 'editions' in challenge;
//       const slug = filePath.replace(/\.[^/.]+$/, '');

//       if (isPeriodic) {
//         delete challenge.editions[slug];
//       } else {
//         previous.challenges = previous.challenges.filter(
//           findChallengeCallback(filePath, true)
//         );
//       }

//       return [previous, `${slug}.json`];
//     }
//   };
// }

// TODO: Use this

// import { dirExists, fileExists } from '../../src/utils/filesystem';
// import * as fs from 'fs-extra';
// import * as path from 'path';
// import { REVIEW_MANIFEST } from '../constants';
// import { cleanPath } from '../../src/utils/generators-options';
// import { IChallenge } from '../models/contest-mapper';
// import { IMetaData } from '../../src/builders/models/press';

// export const getEditionSubmissions = async (
//   slug: string,
//   submissionsDir: string
// ) => {
//   const directory = path.join(submissionsDir, slug);
//   const subDirs = (await dirExists(directory))
//     ? (await fs.readdir(directory, { withFileTypes: true }))
//         .filter(dirent => dirent.isDirectory())
//         .map(dirent => dirent.name)
//     : [];
//   return await Promise.all(
//     subDirs.map(async dirname => {
//       const reviewFilePath = path.join(directory, dirname, REVIEW_MANIFEST);
//       const review = (await fileExists(reviewFilePath))
//         ? await fs.readJson(reviewFilePath)
//         : {};
//       return {
//         author: dirname,
//         path: cleanPath(path.join(slug, dirname)),
//         review
//       };
//     })
//   );
// };

// export function ensureChallengeExists(
//   challenges: IChallenge[],
//   filePath: string
// ) {
//   const challenge = challenges.find(findChallengeCallback(filePath));
//   if (!challenge) {
//     const l = challenges.push({
//       name: '',
//       slug: '',
//       summary: '',
//       metadata: {}
//     });
//     return challenges[l - 1];
//   }
//   return challenge;
// }

// export function findChallengeCallback(filePath: string, reverseOutput = false) {
//   return (item: IChallenge) =>
//     ('editions' in item
//       ? item.metadata.manifestFile === filePath
//       : item.metadata.filePath === filePath) !== reverseOutput;
// }

// export function uniqueChallenges(challenges: IChallenge[]) {
//   const seen: IMetaData = {};
//   challenges = challenges.filter(function (entry) {
//     let previous;

//     if ('editions' in entry && entry.slug in seen) {
//       // Yes, grab it and add this data to it
//       previous = seen[entry.slug];
//       previous.editions = {
//         ...(previous.editions ?? {}),
//         ...entry.editions
//       };

//       // Don't keep this entry, we've merged it into the previous one
//       return false;
//     }

//     // Remember that we've seen it
//     seen[entry.slug] = entry;

//     // Keep this one, we'll merge any others that match into it
//     return true;
//   });

//   return challenges;
// }
