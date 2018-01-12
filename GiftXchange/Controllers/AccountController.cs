using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GiftXchange.Auth;
using GiftXchange.Helpers;
using GiftXchange.Models;
using GiftXchange.ViewModels.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace GiftXchange.Controllers
{
  [Authorize()]
  [Route("api/account")]
  public class AccountController : Controller
  {

    private UserManager<GXUser> _userManager;
    private readonly IJwtFactory _jwtFactory;
    private readonly JwtIssuerOptions _jwtOptions;


    public AccountController(UserManager<GXUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
    {
      _userManager = userManager;
      _jwtFactory = jwtFactory;
      _jwtOptions = jwtOptions.Value;
    }

    [AllowAnonymous]
    [HttpPost("authenticate")]
    public async Task<IActionResult> AuthenticateAsync([FromBody] LoginViewModel vm)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var identity = await GetClaimsIdentity(vm.username, vm.password);
      if (identity == null)
      {
        return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
      }

      var user = await _userManager.FindByNameAsync(vm.username);

      var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, vm.username, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });

      return Ok(new
      {
        Id = user.Id,
        username = user.UserName,
        firstname = user.firstName,
        lastname = user.lastName,
        email = user.Email,
        token = jwt
      });


    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody]RegisterViewModel vm)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      try
      {

        var userIdentity = new GXUser()
        {
          UserName = vm.email,
          Email = vm.email,
          firstName = vm.firstName,
          lastName = vm.lastName,
          gender = vm.gender
        };

        var result = await _userManager.CreateAsync(userIdentity, vm.password);

        if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

        return Ok(result);

      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }

    }

    private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
    {
      if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
        return await Task.FromResult<ClaimsIdentity>(null);

      // get the user to verifty
      var userToVerify = await _userManager.FindByNameAsync(userName);

      if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

      // check the credentials
      if (await _userManager.CheckPasswordAsync(userToVerify, password))
      {
        return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
      }

      // Credentials are invalid, or account doesn't exist
      return await Task.FromResult<ClaimsIdentity>(null);
    }


  }
}
