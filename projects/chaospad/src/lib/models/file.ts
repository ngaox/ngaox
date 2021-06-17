import { IRI, Topic, User } from './_index';

export interface File {
  id: number;
  title: string; // 255
  // path?: string; // 255 // * local
  url: string;
  type: Topic | IRI; // Topic <type:file>
  owner: User | IRI;
  tags: (Topic | IRI)[];
  visibility: Topic | IRI; // Topic <type:visibility>
  uplaodedAt: Date;
}
