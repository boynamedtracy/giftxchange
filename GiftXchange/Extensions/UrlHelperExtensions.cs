using GiftXchange.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Extensions
{
  public static class UrlHelperExtensions
  {

    public static string EmailConfirmationLink(this IUrlHelper urlHelper, string userId, string code, string scheme)
    {
      //return urlHelper.Action(
      //    action: nameof(HomeController.ConfirmEmail),
      //    controller: "Home",
      //    values: new { userId, code },
      //    protocol: scheme);

      var ub = new UriBuilder(scheme, "localhost");
      ub.Port = 62139;
      ub.Query = $"userId={userId}&code={code}";

      return ub.ToString();

    }

    public static string ResetPasswordCallbackLink(this IUrlHelper urlHelper, string userId, string code, string scheme)
    {
      return urlHelper.Action(
          action: nameof(AccountController.ResetPassword),
          controller: "Account",
          values: new { userId, code },
          protocol: scheme);
    }
  }
}
