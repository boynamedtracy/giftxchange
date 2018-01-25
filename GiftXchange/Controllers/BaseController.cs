using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GiftXchange.Data;
using GiftXchange.Models;
using GiftXchange.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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

    protected async Task<GXUser> getUser()
    {
      var userId = _caller.Claims.Single(c => c.Type == "id");
      var user = await _userManager.FindByIdAsync(userId.Value);
      return user;
    }

    public int MyProperty { get; set; }

    protected readonly ClaimsPrincipal _caller;
    protected readonly GXContext _context;
    protected readonly UserManager<GXUser> _userManager;
    protected readonly IEmailSender _emailSender;

    public BaseController(UserManager<GXUser> userManager, GXContext context,
      IHttpContextAccessor httpContextAccessor, IEmailSender emailSender)
    {
      _caller = httpContextAccessor.HttpContext.User;
      _context = context;
      _userManager = userManager;
      _emailSender = emailSender;
    }

  }

}
