using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static GiftXchange.Helpers.Enums;

namespace GiftXchange.Models
{
  public class GroupInvite
  {
    public int id { get; set; }
    [Required]
    public string guid { get; set; } = Guid.NewGuid().ToString();
    [Required]
    [DataType(DataType.EmailAddress)]
    public string emailAddress { get; set; }
    [JsonIgnore]
    [Required]
    public Group group { get; set; }
    [JsonIgnore]
    [Required]
    public string userId { get; set; }
    [Required]
    public DateTime dateInvited { get; set; } = DateTime.Now;
    [Required]
    public string invitedBy { get; set; }
    [Required]
    public GroupInviteStatus status { get; set; } = GroupInviteStatus.Pending;
    public DateTime? dateAccepted { get; set; }
    public DateTime? dateDeclined { get; set; }

    public string message { get; set; }

    


  }
}
