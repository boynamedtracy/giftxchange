using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GiftXchange.Data;
using GiftXchange.Helpers;
using GiftXchange.Models;
using GiftXchange.Services;
using GiftXchange.Utilities;
using GiftXchange.ViewModels.Groups;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GiftXchange.Controllers
{
  [Authorize(Policy = "ApiUser")]
  [Route("api/groups")]
  public class GroupsController : BaseController
  {


    public GroupsController(UserManager<GXUser> userManager, GXContext context,
      IHttpContextAccessor httpContextAccessor, IEmailSender emailSender) : base(userManager, context, httpContextAccessor, emailSender)
    {

    }

    [HttpGet("index")]
    public async Task<IActionResult> Index()
    {

      var userId = _caller.Claims.Single(c => c.Type == "id");

      var user = await _userManager.FindByIdAsync(userId.Value);
      if (user == null)
        return BadRequest("Not logged in");

      var groups = _context.Groups.Where(x => x.owner == user).ToList();
      var members = _context.GroupMembers.Where(x => x.member == user).ToList();

      groups.AddRange(_context.Groups.Where(x => members.Any(y => y.group == x)));

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

      var group = _context.Groups.Include(x => x.owner).SingleOrDefault(x => x.id == id);

      return Ok(group);
    }

    [HttpGet("getmembers/{id}")]
    public async Task<IActionResult> GetMembers(int id)
    {

      var user = await getUser();

      var group = _context.Groups.FirstOrDefault(x => x.id == id);
      if (group == null)
        return BadRequest("Group not found");

      var users = _context.GroupMembers.Include(x => x.member).Where(x => x.group == group &&
        x.status == Enums.GroupMemberStatus.Active)
        .OrderByDescending(x => x.dateAdded)
        .ToList();

      return Ok(users);
    }

    [HttpPost("invitemember")]
    public async Task<IActionResult> InviteMember([FromBody] GroupInviteViewModel vm)
    {

      string rv = "";

      var user = await getUser();

      if (user == null)
        return BadRequest("You must be logged in to do that");

      try
      {
        var group = _context.Groups.FirstOrDefault(x => x.id == vm.groupId);
        if (group == null)
          return BadRequest("Group not found!");

        if (!ModelState.IsValid)
          return BadRequest(ModelState);

        var invite = new GroupInvite()
        {
          group = group,
          invitedBy = user.Id,
          dateInvited = DateTime.Now,
          emailAddress = vm.emailAddress,
          guid = Guid.NewGuid().ToString(),
          message = vm.message,
          status = Enums.GroupInviteStatus.Pending,
          userId = "",
          dateAccepted = null,
          dateDeclined = null
        };

        var invitee = await _userManager.FindByEmailAsync(invite.emailAddress);
        if (invitee != null)
        {
          invite.userId = invitee.Id;
        }

        if (!_context.GroupInvites.Any(x => x.emailAddress.Equals(invite.emailAddress) && invite.group == x.group))
        {
          await _context.GroupInvites.AddAsync(invite);
          await _context.SaveChangesAsync();
          var subject = MessageBuilder.buildGroupInviteSubject(group, invite, user);
          var msg = MessageBuilder.buildGroupInviteMessage(group, invite, user, url);
          await _emailSender.SendEmailAsync(vm.emailAddress, subject, msg);
          rv = "Success: Invite sent";
        }
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }


      return Ok(rv);
    }

    [HttpPost("acceptinvite")]
    public async Task<IActionResult> AcceptInvite([FromBody] GroupInviteAcceptViewModel vm)
    {
      var user = await getUser();

      var invite = _context.GroupInvites
        .Include(x => x.group)
        .FirstOrDefault(x => x.guid == vm.guid);
      if (invite == null)
      {
        return NotFound();
      }

      var group = _context.Groups.FirstOrDefault(x => x.id == invite.group.id);
      if (group == null)
      {
        return NotFound();
      }

      var rv = "";

      try
      {
        var invitee = await _userManager.FindByIdAsync(invite.userId);

        invite.status = Enums.GroupInviteStatus.Accepted;
        invite.dateAccepted = DateTime.Now;
        _context.GroupInvites.Update(invite);

        var inviter = await _userManager.FindByIdAsync(invite.invitedBy);

        await _context.SaveChangesAsync();

        var groupMember = new GroupMember()
        {
          group = group,
          addedBy = inviter.Id,
          dateAdded = invite.dateInvited,
          dateJoined = DateTime.Now,
          status = Enums.GroupMemberStatus.Active,
          member = user
        };

        if (!_context.GroupMembers.Any(x => x.group == group && x.member == user))
        {
          await _context.GroupMembers.AddAsync(groupMember);
          await _context.SaveChangesAsync();
        }

        await _emailSender.SendEmailAsync(inviter.Email, "Your invite has been accepted",
            invite.emailAddress + " has accepted your invitation to the group " +
            group.name);

        rv = "Success";

      }
      catch (Exception ex)
      {
        rv = "Error: " + ex.Message;
      }

      return Ok(rv);
    }

    [HttpGet("getinvite/{guid}")]
    public async Task<IActionResult> GetInvite(string guid)
    {
      var user = await getUser();

      var invite = _context.GroupInvites.FirstOrDefault(x => x.guid == guid);
      if (invite == null)
        return BadRequest("Invite not found!");

      return Ok(invite);

    }

  }
}
