using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static GiftXchange.Helpers.Enums;

namespace GiftXchange.Models
{
  public class GroupMember
  {
    public int id { get; set; }
    [Required]
    public GXUser member { get; set; }
    [Required]
    public Group group { get; set; }
    [Required]
    public DateTime dateAdded { get; set; } = DateTime.Now;    
    public string addedBy { get; set; }
    [Required]
    public DateTime dateJoined { get; set; } = DateTime.Now;
    [MaxLength(128)]
    public string familyName { get; set; }
    [MaxLength(128)]
    public string ageGroup { get; set; }
    [MaxLength(128)]
    public string role { get; set; }
    [Required]
    public GroupMemberStatus status { get; set; } = GroupMemberStatus.Active;
  }
}
