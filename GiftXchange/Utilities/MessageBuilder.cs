using GiftXchange.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftXchange.Utilities
{
  public static class MessageBuilder
  {
    public static string buildGroupInviteSubject(Group group, GroupInvite invite, GXUser user)
    {
      if (group == null)
        return "";
      if (invite == null)
        return "";
      if (user == null)
        return "";

      var sb = new StringBuilder();

      if (!string.IsNullOrEmpty(user.lastName) & !string.IsNullOrEmpty(user.firstName))
      {
        sb.AppendFormat("{0} {1}", user.firstName, user.lastName);
      }
      else
      {
        sb.AppendFormat("{0}", user.Email);
      }

      sb.AppendFormat(" has invited you to to ");
      switch (user.gender)
      {
        case "":
          sb.Append("their");
          break;
        case "m":
          sb.Append("his");
          break;
        case "f":
          sb.Append("her");
          break;
        default:
          sb.Append("their");
          break;
      }
      sb.AppendFormat(" group {0} on Gift Exchange", group.name);

      return sb.ToString();
    }
    public static string buildGroupInviteMessage(Group group, GroupInvite invite, GXUser user, string url)
    {
      if (group == null)
        return "";
      if (invite == null)
        return "";
      if (user == null)
        return "";

      var sb = new StringBuilder();

      sb.AppendFormat("<p>{0}</p>", buildGroupInviteSubject(group, invite, user));

      sb.Append("<hr />");

      sb.AppendFormat("<div>{0}</div>", invite.message);

      var acceptUrl = url + "/acceptinvite/" + invite.guid.ToString();

      sb.AppendFormat("<p><a href=\"{0}\">{1}</a></p>", acceptUrl, "Click here to join this group");

      return sb.ToString();

    }
  }
}
