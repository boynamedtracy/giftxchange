using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.ViewModels.Account
{
  public class ConfirmEmailViewModel
  {
    [Required]
    public string userId { get; set; }
    [Required]
    public string code { get; set; }
  }
}
