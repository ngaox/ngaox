import { IMetaData } from './generic';

export type IChallengesMap = Array<IChallenge>;

export type IChallenge = ISingleChallenge | IPeriodicChallenge;

export type ISingleChallenge = IChallengeBase & IEdition;
export type IPeriodicChallenge = IChallengeBase & {
  metadata: IMetaData;
  next?: IAnnouncement;
  // Is set to a number (length of editions) only in content map
  editions?: {
    [slug: string]: string; // path to edition
  };
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
  body?: string;
  metadata: IMetaData;
  submissions?: ISubmission[];
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
