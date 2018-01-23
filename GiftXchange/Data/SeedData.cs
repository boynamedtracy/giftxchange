using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Data
{
  public static class SeedData
  {
    public static void Initialize(IServiceProvider serviceProvider)
    {
      var context = serviceProvider.GetRequiredService<GXContext>();
      context.Database.EnsureCreated();
      if (!context.NotificationTypes.Any())
      {
        context.NotificationTypes.Add(new Models.NotificationType() { name = "Group_Created" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "Group_Deleted" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "Group_Updated" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "Group_Joined" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "Group_Left" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "Group_Invite_Sent" });

        context.NotificationTypes.Add(new Models.NotificationType() { name = "User_Joined" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "User_LoggedIn" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "User_LoggedOut" });

        context.NotificationTypes.Add(new Models.NotificationType() { name = "List_Created" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "List_Updated" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "List_Deleted" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "List_AddedToGroup" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "List_RemovedFromGroup" });

        context.NotificationTypes.Add(new Models.NotificationType() { name = "Exchange_Created" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "Exchange_Deleted" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "Exchange_Updated" });
        context.NotificationTypes.Add(new Models.NotificationType() { name = "Exchange_Generated" });
      }
      if (context.Users.Any())
      {
        foreach (var u in context.Users)
        {
          if (!context.Lists.Any(x => x.owner == u))
          {
            context.Lists.Add(new Models.List() { name = "My Wish List", owner = u, priority = -1, slug = "my-wish-list" });
          }
        }
      }
    }
  }
}
