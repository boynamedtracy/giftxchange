using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Models
{
  public class ProfilePic
  {
    public int id { get; set; }
    [Required]
    public string guid { get; set; } = Guid.NewGuid().ToString();
    [Required]
    public string userId { get; set; }
    [Required]
    public string imgData { get; set; }

    public virtual GXUser user { get; set; }

  }
}
