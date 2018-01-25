import { User } from "./user.model";

export class GroupMember {
  id: number;
  member: User;
  dateAdded: Date;
  familyName: string;
  ageGroup: string;
  role: string;
  status: number;
}
