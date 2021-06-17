import { IRI, Post, Topic, User } from './_index';

export interface Project {
  id: number;
  title: string; // 50
  thumbnail: File | IRI; // type image
  post?: Post | IRI;
  description: string; // 255
  topics: (Topic | IRI)[]; // Topic <any>
  liveAction: string; // url
  sourceUrl: string; // url
  owner: User | IRI;
  visibility: Topic | IRI; // Topic <type:visibility>
  createdAt: Date;
}
