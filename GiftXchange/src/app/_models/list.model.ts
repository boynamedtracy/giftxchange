import { User } from "./user.model";
import { ListItem } from "./list-item.model";

export class List {
  id: number;
  guid: string;
  name: string;
  slug: string;
  owner: User;
  dateCreated: Date;
  dateModified: Date;
  priority: number;
  description: string;

  items: ListItem[];
}
