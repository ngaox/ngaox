import { IRI, Post, Topic, User } from './_index';

export interface Blog {
  id: number;
  blogname: string; // 30
  name: string; // 30
  icon: File | IRI;
  description: string; // markdown - 500
  owner: User | IRI;
  members: (User | IRI)[];
  posts: (Post | IRI)[];
  visibility: Topic; // Topic <type: visibility>
  createdAt: Date;
}
