using GiftXchange.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Data
{
  public class GXContext : IdentityDbContext<GXUser>
  {

    public GXContext(DbContextOptions<GXContext> options)
      : base(options)
    {
    }

    public DbSet<Group> Groups { get; set; }
    public DbSet<GroupMember> GroupMembers { get; set; }
    public DbSet<GroupInvite> GroupInvites { get; set; }
    public DbSet<NotificationType> NotificationTypes { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<List> Lists { get; set; }
    public DbSet<ListItem> ListItems { get; set; }
    public DbSet<ProfilePic> ProfilePics { get; set; }
    public DbSet<Exchange> Exchanges { get; set; }

  }
}
