using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace GiftXchange.Controllers
{
  public class BaseController : Controller
  {
    public string url
    {
      get
      {
        var s = "";

        if (HttpContext.Request.IsHttps)
        {
          s = "https://";
        }
        else
        {
          s = "http://";
        }

        s += HttpContext.Request.Host + "/";

        return s;
      }
    }
  }

}
