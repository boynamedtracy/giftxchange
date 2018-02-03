import { User } from "./user.model";
import { Exchange } from "./exchange.model";

export class Group {
  id: number;
  guid: string;
  name: string;
  slug: string;
  dateCreated: Date;
  description: string;
  owner: User;

  exchanges: Exchange[];
}
