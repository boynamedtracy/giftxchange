using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Models
{
  public class ListItem
  {
    public int id { get; set; }
    [Required]
    public string guid { get; set; } = Guid.NewGuid().ToString();
    [JsonIgnore]
    [Required]
    public List list { get; set; }
    [Required]
    [MaxLength(128)]
    public string name { get; set; }
    [MaxLength(128)]
    public string color { get; set; }
    [MaxLength(128)]
    public string size { get; set; }
    [MaxLength(500)]
    public string url { get; set; }
    public string notes { get; set; }
    [Required]
    public int priority { get; set; } = -1;
    [Required]
    public DateTime dateCreated { get; set; } = DateTime.Now;
    [Required]
    public DateTime dateModified { get; set; } = DateTime.Now;
  }
}
