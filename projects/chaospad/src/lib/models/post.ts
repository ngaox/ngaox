import { Topic } from './topic';
import { User } from './user';

export interface Post {
  id: number;
  // * title: string; // 100
  // * thumbnail: File;
  slug: string; // unique
  type: Topic | string; // Topic <type:post>
  content: string; // ? custom syntax markdown Text
  owner: User | string;
  tags: (Topic | string)[];
  replyingTo?: Comment | string;
  comments?: (Post | string)[]; // Post <type:post=comment>
  edited: Boolean;
  visibility: Topic | string; // Topic <type:visibility>
  postedAt: Date;
}
