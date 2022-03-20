import { IMetaData } from './generic-mapper';

export type IChallengesMap = Array<
  IChallenge & {
    editions?: number;
  }
>;

export type IChallenge = ISingleChallenge | IPeriodicChallenge;

export type ISingleChallenge = IChallengeBase & IEdition;
export type IPeriodicChallenge = IChallengeBase & {
  metadata: IMetaData;
  next?: IAnnouncement;
  // Is set to a number (length of editions) only in content map
  editions: IEdition[];
};

export interface IAnnouncement {
  title: string;
  description: string;
  challengeSlug: string;
  date: string;
}

export interface IEdition {
  date: string;
  duration: string;
  body: string;
  metadata: IMetaData;
  submissions: ISubmission[];
}

export interface ISubmission {
  author: string;
  path: string;
  review: IMetaData;
}

interface IChallengeBase {
  name: string;
  slug: string;
  summary: string;
}
