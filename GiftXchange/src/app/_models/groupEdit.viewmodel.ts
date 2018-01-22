import { User } from "./user.model";

export class GroupEditViewModel {
  id: number;
  guid: string;
  name: string;
  dateCreated: Date;
  description: string;
  owner: User;
}
