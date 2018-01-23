using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Models
{
  public class Notification
  {
    public int id { get; set; }
    [Required]
    public string guid { get; set; } = Guid.NewGuid().ToString();
    [Required]
    public DateTime date { get; set; } = DateTime.Now;
    [Required]
    public string type { get; set; }
    [Required]
    [DataType(DataType.Html)]
    public string notification { get; set; }
    [DataType(DataType.Url)]
    public string url { get; set; }
    public GXUser user { get; set; }
  }
}
