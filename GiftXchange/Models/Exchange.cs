using GiftXchange.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Models
{
  public class Exchange
  {
    public int id { get; set; }
    [Required]
    public int groupId { get; set; }
    [Required]
    [MaxLength(128)]
    public string name { get; set; }
    [Required]
    public Enums.ExchangeCategory category { get; set; } = Enums.ExchangeCategory.NotSet;
    [MaxLength(128)]
    public string otherCategory { get; set; }
    [Required]
    public Enums.ExchangeType type { get; set; } = Enums.ExchangeType.Yearly;
    public string description { get; set; }
    public string memberFilter { get; set; }
    public DateTime dateCreated { get; set; } = DateTime.Now;
    public string createdBy { get; set; }

    public virtual Group group { get; set; }

  }
}
