using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Models
{
  public class NotificationType
  {
    public int id { get; set; }
    [Required]
    public string name { get; set; }
    public GXUser createdBy { get; set; }
    public DateTime dateCreated { get; set; } = DateTime.Now;
  }
}
