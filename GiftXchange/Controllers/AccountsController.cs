using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftXchange.Data;
using GiftXchange.Helpers;
using GiftXchange.Models;
using GiftXchange.ViewModels.Account;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace GiftXchange.Controllers
{
  [Produces("application/json")]
  [Route("api/Accounts")]
  public class AccountsController : Controller
  {
    private readonly GXContext _appDbContext;
    private readonly UserManager<GXUser> _userManager;
    private readonly IMapper _mapper;

    public AccountsController(UserManager<GXUser> userManager, GXContext appDbContext)
    {
      _userManager = userManager;
      _appDbContext = appDbContext;
    }

    // POST api/accounts
    [HttpPost]
    public async Task<IActionResult> Post([FromBody]RegisterViewModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var userIdentity = new GXUser()
      {
        UserName = model.email,
        Email = model.email,
        firstName = model.firstName,
        lastName = model.lastName,
        gender = model.gender
      };

      var result = await _userManager.CreateAsync(userIdentity, model.password);

      if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

      //await _appDbContext.Customers.AddAsync(new Customer { IdentityId = userIdentity.Id, Location = model.Location });
      //await _appDbContext.SaveChangesAsync();

      return new OkObjectResult("Account created");
    }
  }
}
