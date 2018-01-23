using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GiftXchange.Data;
using GiftXchange.Models;
using GiftXchange.ViewModels.Lists;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GiftXchange.Controllers
{
  [Authorize(Policy = "ApiUser")]
  [Route("api/lists")]
  public class ListsController : Controller
  {
    private readonly ClaimsPrincipal _caller;
    private readonly GXContext _context;
    private readonly UserManager<GXUser> _userManager;

    public ListsController(UserManager<GXUser> userManager, GXContext context, IHttpContextAccessor httpContextAccessor)
    {
      _caller = httpContextAccessor.HttpContext.User;
      _context = context;
      _userManager = userManager;
    }

    [HttpGet("getlists")]
    public async Task<IActionResult> Index()
    {

      var userId = _caller.Claims.Single(c => c.Type == "id");

      var user = await _userManager.FindByIdAsync(userId.Value);
      if (user == null)
        return BadRequest("Not logged in");

      var lists = _context.Lists.Include(x => x.items)
        .Where(x => x.owner == user).ToList();

      return Ok(lists);
    }

    [HttpGet("getlist/{id}")]
    public async Task<IActionResult> GetList(int id)
    {
      var userId = _caller.Claims.Single(c => c.Type == "id");
      var user = await _userManager.FindByIdAsync(userId.ToString());

      var list = _context.Lists.SingleOrDefault(x => x.id == id);

      return Ok(list);
    }

    [HttpPost("savelist")]
    public async Task<IActionResult> SaveList([FromBody] ListEditViewModel vm)
    {
      var userId = _caller.Claims.Single(c => c.Type == "id");
      var user = await _userManager.FindByIdAsync(userId.Value);
      if (user == null)
        return BadRequest("Not logged in");
      
      var list = _context.Lists.FirstOrDefault(x => x.id == vm.id);
      if (list == null)
      {
        list = new List()
        {
          dateCreated = DateTime.Now,
          owner = user,
          guid = Guid.NewGuid().ToString()
        };
      }

      list.name = vm.name;
      list.slug = vm.slug;
      list.dateUpdated = DateTime.Now;
      list.priority = vm.priority;
      list.description = vm.description;

      var slugCount = _context.Lists.Where(x => x.slug == list.slug && list.id != list.id).Count();
      if (slugCount > 0)
      {
        list.slug += $"-{slugCount}";
      }

      if (list.id > 0)
      {
        _context.Lists.Update(list);
      }
      else
      {
        await _context.Lists.AddAsync(list);
      }
      await _context.SaveChangesAsync();

      return Ok(list);
    }


    [HttpPost("additem")]
    public async Task<IActionResult> AddItem([FromBody] ListItemEditViewModel vm)
    {
      var userId = _caller.Claims.Single(c => c.Type == "id");
      var user = await _userManager.FindByIdAsync(userId.Value);
      if (user == null)
        return BadRequest("Not logged in");

      var list = _context.Lists.FirstOrDefault(x => x.id == vm.listId);
      if (list == null)
        return BadRequest("List not found");

      var item = new ListItem()
      {
        list = list,
        name = vm.name,
        color = vm.color,
        size = vm.size,
        url = vm.url,
        guid = Guid.NewGuid().ToString(),
        dateCreated = DateTime.Now,
        dateModified = DateTime.Now,
        notes = vm.notes,
        priority = vm.priority
      };

      await _context.ListItems.AddAsync(item);
      await _context.SaveChangesAsync();

      return Ok(item);

    }

  }
}
