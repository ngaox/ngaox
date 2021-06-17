import { IRI, Post, Topic, User } from './_index';

export interface Blog {
  id: number;
  blogname: string;
  name: string;
  picture: File | IRI;
  background: File | IRI;
  description: string; // markdown
  owner: User | IRI;
  members: (User | IRI)[];
  posts: (Post | IRI)[];
  visibility: Topic; // Topic <type: visibility>
  // createdAt: Date;
}
