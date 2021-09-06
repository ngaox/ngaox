import { IRI, Topic, User } from './_index';

export interface Career {
  id: number;
  title: string; // 50
  description?: string; // 255
  type: Topic | IRI; // Topic <type:career>
  startedAt: Date;
  doneAt?: Date;
  corporation: string; // 30
  owner: User | IRI;
  visibility: Topic | IRI; // Topic <type:visibility>
  createdAt: Date;
}
