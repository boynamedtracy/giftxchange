using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Models
{
  public class GXRole : IdentityRole
  {
    public string description { get; set; }
  }
}
