using System.Security.Claims;
using System.Threading.Tasks;
using GiftXchange.Auth;
using GiftXchange.Helpers;
using GiftXchange.Models;
using GiftXchange.ViewModels.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace GiftXchange.Controllers
{
  [Route("api/auth")]
  public class AuthController : Controller
  {
    private readonly UserManager<GXUser> _userManager;
    private readonly SignInManager<GXUser> _signInManager;
    private readonly RoleManager<GXRole> _roleManager;
    private IPasswordHasher<GXUser> _passwordHasher;
    private IConfiguration _configurationRoot;
    private ILogger<AuthController> _logger;
    private readonly IJwtFactory _jwtFactory;

    private readonly JwtIssuerOptions _jwtOptions;

    public AuthController(UserManager<GXUser> userManager,
        SignInManager<GXUser> signInManager,
        RoleManager<GXRole> roleManager,
        IPasswordHasher<GXUser> passwordHasher,
        IConfiguration configurationRoot,
        ILogger<AuthController> logger,
        IJwtFactory jwtFactory,
        IOptions<JwtIssuerOptions> jwtOptions)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _roleManager = roleManager;
      _passwordHasher = passwordHasher;
      _configurationRoot = configurationRoot;
      _logger = logger;
      _jwtFactory = jwtFactory;
      _jwtOptions = jwtOptions.Value;
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
    {
      if (!ModelState.IsValid)
        return BadRequest();

      var user = new GXUser()
      {
        UserName = model.email,
        Email = model.email,
        firstName = model.firstName,
        lastName = model.lastName,
        gender = model.gender
      };
      var result = await _userManager.CreateAsync(user, model.password);

      if (result.Succeeded)
      {
        return Ok(result);
      }

      foreach (var error in result.Errors)
      {
        ModelState.AddModelError("error", error.Description);
      }

      return BadRequest(result.Errors);
    }


    [HttpPost("login")]

    public async Task<IActionResult> Post([FromBody]CredentialsViewModel credentials)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
      if (identity == null)
      {
        return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
      }

      var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
      return new OkObjectResult(jwt);
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
