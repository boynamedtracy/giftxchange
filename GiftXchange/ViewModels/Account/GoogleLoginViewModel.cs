using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.ViewModels.Account
{
  public class GoogleLoginViewModel
  {
    public string email { get; set; }
    public string name { get; set; }
    public string googleId { get; set; }
    public string photoUrl { get; set; }
    public string token { get; set; }
  }
}
