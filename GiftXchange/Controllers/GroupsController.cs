using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GiftXchange.Data;
using GiftXchange.Helpers;
using GiftXchange.Models;
using GiftXchange.ViewModels.Groups;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GiftXchange.Controllers
{
  [Authorize(Policy = "ApiUser")]
  [Route("api/groups")]
  public class GroupsController : Controller
  {

    private readonly ClaimsPrincipal _caller;
    private readonly GXContext _context;
    private readonly UserManager<GXUser> _userManager;

    public GroupsController(UserManager<GXUser> userManager, GXContext context, IHttpContextAccessor httpContextAccessor)
    {
      _caller = httpContextAccessor.HttpContext.User;
      _context = context;
      _userManager = userManager;
    }

    [HttpGet("index")]
    public async Task<IActionResult> Index()
    {

      var userId = _caller.Claims.Single(c => c.Type == "id");

      var user = await _userManager.FindByIdAsync(userId.Value);
      if (user == null)
        return BadRequest("Not logged in");

      var groups = _context.Groups.Where(x => x.owner == user).ToList();

      return Ok(groups);
    }

    [HttpPost("savegroup")]
    public async Task<IActionResult> SaveGroup([FromBody] GroupEditViewModel vm)
    {
      var userId = _caller.Claims.Single(c => c.Type == "id");
      var user = await _userManager.FindByIdAsync(userId.Value);
      if (user == null)
        return BadRequest("Not logged in");

      var group = _context.Groups.FirstOrDefault(x => x.id == vm.id);
      if (group == null)
      {
        group = new Group()
        {
          dateCreated = DateTime.Now,
          owner = user,
          guid = Guid.NewGuid().ToString()
        };
      }

      group.name = vm.name;
      group.description = vm.description;
      group.slug = vm.slug;
      var slugCount = _context.Groups.Where(x => x.slug == group.slug && group.id != group.id).Count();
      if (slugCount > 0)
      {
        group.slug += $"-{slugCount}";
      }

      if (group.id > 0)
      {
        _context.Groups.Update(group);
      }
      else
      {
        await _context.Groups.AddAsync(group);
      }
      await _context.SaveChangesAsync();

      return Ok(group);
    }

    [HttpGet("getgroup/{id}")]
    public async Task<IActionResult> GetGroup(int id)
    {
      var userId = _caller.Claims.Single(c => c.Type == "id");
      var user = await _userManager.FindByIdAsync(userId.ToString());

      var group = _context.Groups.SingleOrDefault(x => x.id == id);

      return Ok(group);
    }


  }
}
