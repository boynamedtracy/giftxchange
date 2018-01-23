using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Models
{
  public class List
  {
    public int id { get; set; }
    [Required]
    public string guid { get; set; } = Guid.NewGuid().ToString();
    [Required]
    [MaxLength(128)]
    public string name { get; set; }
    [Required]
    [MaxLength(128)]
    public string slug { get; set; }
    [Required]
    public GXUser owner { get; set; }
    [Required]
    public DateTime dateCreated { get; set; } = DateTime.Now;
    [Required]
    public DateTime dateUpdated { get; set; } = DateTime.Now;
    [Required]
    public int priority { get; set; } = 0;
  }
}
