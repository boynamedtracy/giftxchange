using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using GiftXchange.Auth;
using GiftXchange.Extensions;
using GiftXchange.Helpers;
using GiftXchange.Models;
using GiftXchange.Services;
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
  public class AccountController : BaseController
  {

    private UserManager<GXUser> _userManager;
    private readonly IJwtFactory _jwtFactory;
    private readonly JwtIssuerOptions _jwtOptions;
    private readonly IEmailSender _emailSender;

    public AccountController(UserManager<GXUser> userManager,
      IEmailSender emailSender,
      IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
    {
      _userManager = userManager;
      _jwtFactory = jwtFactory;
      _jwtOptions = jwtOptions.Value;
      _emailSender = emailSender;
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

      if (!user.EmailConfirmed)
      {
        return BadRequest(Errors.AddErrorToModelState("login_failure", "Login error. Code 1", ModelState));
      }

      return Ok(new
      {
        Id = user.Id,
        userName = user.UserName,
        firstName = user.firstName,
        lastName = user.lastName,
        email = user.Email,
        facebookId = user.facebookId,
        photoUrl = user.photoUrl,
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

        var user = new GXUser()
        {
          UserName = vm.email,
          Email = vm.email,
          firstName = vm.firstName,
          lastName = vm.lastName,
          gender = vm.gender
        };

        var result = await _userManager.CreateAsync(user, vm.password);

        if (!result.Succeeded) {
          return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
        };

        var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        //var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);

        var ub = new UriBuilder(url);
        ub.Path = "confirm-email";
        ub.Query = $"userId={user.Id}&code={HttpUtility.UrlEncode(code)}";

        var callbackUrl = ub.ToString();

        await _emailSender.SendEmailConfirmationAsync(user.Email, callbackUrl);


        return Ok(result);

      }
      catch (AppException ex)
      {
        return BadRequest(ex.Message);
      }

    }

    [AllowAnonymous]
    [HttpPost("confirmemail")]
    public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailViewModel vm)
    {
      if (!ModelState.IsValid)
        return BadRequest();

      if (vm.userId == null || vm.code == null)
      {
        return Redirect("/");
      }
      var user = await _userManager.FindByIdAsync(vm.userId);
      if (user == null)
      {
        throw new ApplicationException($"Unable to load user with ID '{vm.userId}'.");
      }
      var result = await _userManager.ConfirmEmailAsync(user, vm.code);
      return Ok(result.Succeeded ? "Success" : "Error");
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult ResetPassword(string code = null)
    {
      if (code == null)
      {
        throw new ApplicationException("A code must be supplied for password reset.");
      }
      //var model = new ResetPasswordViewModel { Code = code };
      return View();
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
