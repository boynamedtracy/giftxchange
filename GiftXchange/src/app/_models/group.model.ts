import { User } from "./user.model";

export class Group {
  id: number;
  guid: string;
  name: string;
  slug: string;
  dateCreated: Date;
  description: string;
  owner: User;
}
