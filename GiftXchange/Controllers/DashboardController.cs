using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GiftXchange.Data;
using GiftXchange.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GiftXchange.Controllers
{
  [Authorize(Policy = "ApiUser")]
  [Route("api/[controller]/[action]")]
  public class DashboardController : Controller
  {
    private readonly ClaimsPrincipal _caller;
    private readonly GXContext _appDbContext;
    private readonly UserManager<GXUser> _userManager;

    public DashboardController(UserManager<GXUser> userManager,
      GXContext appDbContext,
      IHttpContextAccessor httpContextAccessor)
    {
      _caller = httpContextAccessor.HttpContext.User;
      _appDbContext = appDbContext;
      _userManager = userManager;
    }

    // GET api/dashboard/home
    [HttpGet]
    public async Task<IActionResult> Home()
    {
      // retrieve the user info
      //HttpContext.User
      var userId = _caller.Claims.Single(c => c.Type == "id");
      var user = await _userManager.FindByIdAsync(userId.Value);

      return new OkObjectResult(new
      {
        Message = "This is secure API and user data!",
        user.firstName,
        user.lastName,
        user.photoUrl,
        user.facebookId,
        user.gender
      });
    }
  }

}
