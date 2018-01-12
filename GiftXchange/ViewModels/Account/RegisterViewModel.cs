using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.ViewModels.Account
{
  public class RegisterViewModel
  {
    [Required]
    [Display(Name = "Email")]
    [MaxLength(128)]
    public string email { get; set; }
    [Required]
    [Display(Name = "Password")]
    [DataType(DataType.Password)]
    public string password { get; set; }
    [Required]
    [DataType(DataType.Password)]
    [Display(Name = "Confirm Password")]
    [Compare("password", ErrorMessage = "The password and confirmation password do not match.")]
    public string confirmPassword { get; set; }
    [Display(Name = "First Name")]
    [MaxLength(128)]
    public string firstName { get; set; }
    [Display(Name = "Last Name")]
    public string lastName { get; set; }
    [Display(Name = "Gender")]
    [MaxLength(1)]
    public string gender { get; set; }
  }
}
