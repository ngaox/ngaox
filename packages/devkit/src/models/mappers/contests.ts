// import { IMetaData } from './generic';

// export type IContest = IUniqueContest | IPeriodicContest;

// export type IUniqueContest = IContestMeta & IChallenge;
// export type IPeriodicContest = IContestMeta & {
//   metadata: IMetaData;
//   next?: IAnnouncement;
//   editions?: {
//     [slug: string]: string; // date string
//   };
// };

// export interface IChallenge {
//   date: string;
//   duration: string;
//   body?: string;
//   metadata: IMetaData;
//   submissions?: ISubmission[];
// }

// export interface IAnnouncement {
//   title: string;
//   description: string;
//   challengeSlug: string;
//   date: string;
// }

// export interface ISubmission {
//   author: string;
//   points: number;
//   path: string;
//   metadata: IMetaData;
// }

// interface IContestMeta {
//   name: string;
//   slug: string;
//   summary: string;
// }
