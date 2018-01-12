using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace GiftXchange.Models
{
  public class GXUser : IdentityUser
  {
    [MaxLength(128)]
    public string firstName { get; set; }

    [MaxLength(128)]
    public string lastName { get; set; }

    [MaxLength(128)]
    public string nickname { get; set; }

    public string gender { get; set; }

    public DateTime? birthDate { get; set; } = null;

    public long? facebookId { get; set; } = null;

    public string photoUrl { get; set; }

    [Required]
    public DateTime dateJoined { get; set; } = DateTime.Now;

  }
}
