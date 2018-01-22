using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Models
{
  public class Group
  {

    public int id { get; set; }
    [Required]
    [Display(Name = "GUID")]
    public string guid { get; set; } = Guid.NewGuid().ToString();
    [Required]
    [MaxLength(128)]
    [Display(Name = "Name")]
    public string name { get; set; }
    [Required]
    [MaxLength(128)]
    [Display(Name = "Slug")]
    public string slug { get; set; }
    [Required]
    [Display(Name = "Date Created")]
    [DataType(DataType.DateTime)]
    [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy hh:mm tt}", ApplyFormatInEditMode = true)]
    public DateTime dateCreated { get; set; } = DateTime.Now;
    [Required]
    [Display(Name = "Owner")]
    public GXUser owner { get; set; }
    [Display(Name = "Description")]
    [DataType(DataType.Html)]
    public string description { get; set; }

  }
}
