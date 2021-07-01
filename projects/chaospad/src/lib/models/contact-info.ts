import { IRI, Topic, User } from './_index';

export interface ContactInfo {
  id: number;
  value: string;
  type: string; // Type & logo are Type.topicname & Type.logo
  logo: string;
  owner: User | IRI;
  validated: Boolean;
  visibility: Topic | IRI; // Topic <type:visibility>
}
