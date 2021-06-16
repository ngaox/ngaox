import { Topic } from './topic';
import { User } from './user';

export interface File {
  id: number;
  title: string; // 255
  // path?: string; // 255 // * local
  url: string;
  type: Topic | string; // Topic <type:file>
  owner: User | string;
  tags: (Topic | string)[];
  visibility: Topic | string; // Topic <type:visibility>
  uplaodedAt: Date;
}
