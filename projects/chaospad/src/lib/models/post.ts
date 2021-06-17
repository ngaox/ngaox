import { IRI, Topic, User } from './_index';

export interface Post {
  id: number;
  // * title: string; // 100
  // * thumbnail: File;
  slug: string; // unique
  type: Topic | IRI; // Topic <type:post>
  content: string; // ? custom syntax markdown Text
  owner: User | IRI;
  tags: (Topic | IRI)[];
  replyingTo?: Post | IRI;
  comments?: (Post | IRI)[]; // Post <type:post=comment>
  edited: Boolean;
  visibility: Topic | IRI; // Topic <type:visibility>
  postedAt: Date;
}
