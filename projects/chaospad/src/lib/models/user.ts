import { Blog, Career, ContactInfo, IRI, Topic } from './_index';

export interface User {
  id: number;
  username: string; // 25
  roles?: string[];
  email: string; // ! ContactInfo
  // password: string; // 6 - 50
  fullname: string; // 30
  gender: Topic | IRI; // Topic <type:gender>
  birthday: Date;
  bio?: string; // 150
  picture?: File | IRI;
  background?: File | IRI;
  visibility: Topic | IRI; // Topic <type:visibility>
  joinedAt: Date;

  // * contactInfos?: (ContactInfo | IRI)[];
  // * careers?: (Career | IRI)[];
  // * blogs?: (Blog | IRI)[];
  // * files?: (File | IRI)[]; // ?* private
  // ? * skills?: (Topic | IRI)[];
}
