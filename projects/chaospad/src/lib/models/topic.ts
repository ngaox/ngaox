export interface Topic {
  id: number;
  topicname: string; // 50
  logo: string;
  title: string; // 50
  description?: string; // 255
  aliases: string[]; // 50
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
