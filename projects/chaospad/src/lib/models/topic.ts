export interface Topic {
  id: number;
  topicname: string; // 30
  logo: string;
  title: string; // 30
  description?: string; // 255
  aliases: string[]; // 30
  types: (
    | 'topic' // default / auto-included
    | 'gender'
    | 'file'
    | 'career'
    | 'contact-info'
    | 'post'
    | 'visibility'
  )[];
}
