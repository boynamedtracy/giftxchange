using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.ViewModels.Account
{
  public class LoginViewModel
  {
    [Required]
    [MaxLength(128)]
    public string username { get; set; }
    [Required]
    [MaxLength(255)]
    public string password { get; set; }
  }
}
