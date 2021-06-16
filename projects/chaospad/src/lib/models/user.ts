import { Topic } from './topic';

export interface User {
  id: number;
  username: string;
  roles?: string[]; // * private
  email: string; // ContactInfo
  // password: string;
  // plainPassword: string;
  fullname: string; // 50
  gender: Topic | string; // Topic IRI <type:gender>
  birthday: Date | string;
  bio?: string; // 255
  picture?: File | string;
  background?: File | string;
  visibility: Topic | string; // Topic IRI <type:visibility>
  joinedAt: Date | string;
  // * files?: (File | string)[]; // ?* private
  // * contactInfos?: (ContactInfo | string)[];
  // * careers?: (Career | string)[];
  // * posts?: (Post | string)[];
  // * skills?: (Topic | string)[];
  // * projects?: (Project | string)[]
  // * blogs?: (Blog | string)[]
}
