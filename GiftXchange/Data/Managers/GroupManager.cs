using GiftXchange.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Data.Managers
{

  public interface IGroupManager
  {
    Group getGroup(int id);
    Group getBySlug(string slug);
    IEnumerable<Group> getAll();
    IEnumerable<Group> getGroupsByOwner(GXUser user);
  }
  public class GroupManager : IGroupManager
  {
    private readonly GXContext _db;

    public GroupManager(GXContext db)
    {
      _db = db;
    }
    public IEnumerable<Group> getAll()
    {
      return _db.Groups.OrderBy(x => x.name);
    }
    public IEnumerable<Group> getGroupsByOwner(GXUser user)
    {
      return _db.Groups.OrderBy(x => x.owner == user);
    }
    public Group getGroup(int id)
    {
      return _db.Groups.FirstOrDefault(x => x.id == id);
    }
    public Group getBySlug(string slug)
    {
      return _db.Groups.FirstOrDefault(x => x.slug.Equals(slug, StringComparison.InvariantCultureIgnoreCase));
    }

  }
}
