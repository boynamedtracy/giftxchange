using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace GiftXchange.Controllers
{
  public class HomeController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }

    [HttpGet]
    public IActionResult ConfirmEmail(string userId, string code)
    {
      return Redirect("/confirm-email?userId=" + userId + "&code=" + code);
    }
  }
}
