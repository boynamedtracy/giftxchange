import { List } from "./list.model";

export class ListItem {
  id: number;
  guid: string;
  list: List;
  name: string;
  color: string;
  size: string;
  url: string;
  notes: string;
  priority: number;
  dateCreated: Date;
  dateModified: Date;
}
