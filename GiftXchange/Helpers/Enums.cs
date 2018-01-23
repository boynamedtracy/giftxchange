using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Helpers
{
  public class Enums
  {
    public enum GroupMemberStatus
    {
      Pending = 0,
      Active = 1,
      Suspended = 2
    }
    public enum GroupInviteStatus
    {
      Pending = 0,
      Accepted = 1,
      Declined = 2
    }
  }
}