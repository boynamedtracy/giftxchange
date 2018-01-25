export class GroupInvite {
  id: number;
  guid: string;
  emailAddress: string;
  groupId: number;
  userId: string;
  dateInvited: Date;
  invitedBy: string;
  status: number = 0;
  dateAccepted: Date = null;
  dateDeclined: Date = null;
  message: string;
}
