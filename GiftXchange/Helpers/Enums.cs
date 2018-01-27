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

    public enum ExchangeCategory
    {
      NotSet = 0,
      Adult = 1,
      Youth = 2,
      Other = 3
    }

    public enum ExchangeType
    {
      Yearly = 1,
      OneTime = 2
    }
  }
}
