import { Blog, Career, ContactInfo, IRI, Post, Project, Topic } from './_index';

export interface User {
  id: number;
  username: string;
  roles?: string[]; // * private
  email: string; // ContactInfo
  // password: string;
  // plainPassword: string;
  fullname: string; // 50
  gender: Topic | IRI; // Topic IRI <type:gender>
  birthday: Date;
  bio?: string; // 255
  picture?: File | IRI;
  background?: File | IRI;
  visibility: Topic | IRI; // Topic IRI <type:visibility>
  joinedAt: Date;

  contactInfos?: (ContactInfo | IRI)[];
  projects?: (Project | IRI)[];
  careers?: (Career | IRI)[];

  blogs?: (Blog | IRI)[];
  posts?: (Post | IRI)[];

  // * files?: (File | IRI)[]; // ?* private
  // * skills?: (Topic | IRI)[];
}
