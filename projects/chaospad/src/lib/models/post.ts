import { IRI, Topic, User } from './_index';

export interface Post {
  id: number;
  type: Topic | IRI; // Topic <type:post>
  content: string; // ? custom syntax markdown Text
  owner: User | IRI;
  replyingTo?: Post | IRI; // * only on post
  comments?: (Post | IRI)[]; // Post replyingTo not null
  visibility: Topic | IRI; // Topic <type:visibility>
  updatedAt: Date;
  postedAt: Date;
}

export interface Article extends Post {
  title?: string; // 100
  thumbnail?: File; // type: article
  tags: (Topic | IRI)[];
}

export interface Project extends Article {
  liveAction: string; // url
  sourceUrl: string; // url
}
