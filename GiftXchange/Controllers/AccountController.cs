using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using GiftXchange.Auth;
using GiftXchange.Data;
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

    private readonly IJwtFactory _jwtFactory;
    private readonly JwtIssuerOptions _jwtOptions;


    private readonly FacebookAuthSettings _fbAuthSettings;

    private static readonly HttpClient Client = new HttpClient();

    OAuthUtil oAuthUtil = new OAuthUtil();

    public AccountController(UserManager<GXUser> userManager,
      IEmailSender emailSender,
      IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions,
      GXContext context, IHttpContextAccessor httpContextAccessor) : base(userManager, context, httpContextAccessor, emailSender)
    {
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
        photoUrl = !string.IsNullOrEmpty(user.photoUrl) ? user.photoUrl : "/assets/images/profile-pic.png",
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

        if (!result.Succeeded)
        {
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

    [HttpPost("googlelogin")]
    [AllowAnonymous]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginViewModel vm)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var user = await _userManager.FindByEmailAsync(vm.email);
      string password = Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8);

      if (user == null)
      {
        var u = new GXUser()
        {
          Email = vm.email,
          UserName = vm.email,
          googleId = vm.googleId,
          photoUrl = vm.photoUrl,
          firstName = vm.name,
          gender = "",
          dateJoined = DateTime.Now
        };

        var result = await _userManager.CreateAsync(u, password);
        if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

        user = await _userManager.FindByEmailAsync(vm.email);

      }
      else
      {
        user.googleId = vm.googleId;
        user.photoUrl = vm.photoUrl;
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
      }

      var identity = await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(user.UserName, user.Id));
      var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, user.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });


      return Ok(new
      {
        Id = user.Id,
        userName = user.UserName,
        firstName = user.firstName,
        lastName = user.lastName,
        email = user.Email,
        facebookId = user.facebookId,
        photoUrl = !string.IsNullOrEmpty(user.photoUrl) ? user.photoUrl : "/assets/images/profile-pic.png",
        token = jwt
      });
    }

    [AllowAnonymous]
    [HttpPost("fblogin")]
    public async Task<IActionResult> FacebookLogin([FromBody] FacebookViewModel vm)
    {
      var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={"189190551632736"}&client_secret={"3441dee2b662651ee71377f1677756e1"}&grant_type=client_credentials");
      var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);
      // 2. validate the user access token
      var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={vm.AccessToken}&access_token={appAccessToken.AccessToken}");
      var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

      if (!userAccessTokenValidation.Data.IsValid)
      {
        return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid facebook token.", ModelState));
      }

      // 3. we've got a valid token so we can request user data from fb
      var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,locale,birthday,picture&access_token={vm.AccessToken}");
      var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

      // 4. ready to create the local user account (if necessary) and jwt
      var user = await _userManager.FindByEmailAsync(userInfo.Email);

      if (user == null)
      {
        var appUser = new GXUser
        {
          firstName = userInfo.FirstName,
          lastName = userInfo.LastName,
          facebookId = userInfo.Id.ToString(),
          Email = userInfo.Email,
          UserName = userInfo.Email,
          photoUrl = userInfo.Picture.Data.Url
        };

        var result = await _userManager.CreateAsync(appUser, Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8));

        if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

      }
      else
      {
        user.facebookId = userInfo.Id.ToString();
        user.photoUrl = userInfo.Picture.Data.Url;
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
      }

      // generate the jwt for the local user...
      var localUser = await _userManager.FindByNameAsync(userInfo.Email);

      if (localUser == null)
      {
        return BadRequest(Errors.AddErrorToModelState("login_failure", "Failed to create local user account.", ModelState));
      }
      var identity = await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(user.UserName, user.Id));
      var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, user.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });

      return Ok(new
      {
        Id = user.Id,
        userName = user.UserName,
        firstName = user.firstName,
        lastName = user.lastName,
        email = user.Email,
        facebookId = user.facebookId,
        photoUrl = !string.IsNullOrEmpty(user.photoUrl) ? user.photoUrl : "/assets/images/profile-pic.png",
        token = jwt
      });
    }

    [AllowAnonymous]
    [HttpPost("twitterlogin")]
    public async Task<IActionResult> TwitterLogin([FromBody] TwitterViewModel vm)
    {

      var s = await getAccessToken(vm.AccessToken, vm.AuthSecret);

      if (s == null)
      {
        return BadRequest("Twitter login failed");
      }

      var user = await _userManager.FindByEmailAsync(s.email);
      string password = Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8);

      if (user == null)
      {
        var u = new GXUser()
        {
          Email = s.email,
          UserName = s.email,
          googleId = "",
          photoUrl = s.profile_image_url_https,
          firstName = s.name,
          lastName = "",
          gender = "",
          dateJoined = DateTime.Now
        };

        var result = await _userManager.CreateAsync(u, password);
        if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

        user = await _userManager.FindByEmailAsync(s.email);

      }
      else
      {
        user.twitterId = s.id_str;
        user.photoUrl = s.profile_image_url_https;
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
      }

      var identity = await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(user.UserName, user.Id));
      var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, user.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });


      return Ok(new
      {
        Id = user.Id,
        userName = user.UserName,
        firstName = user.firstName,
        lastName = user.lastName,
        email = user.Email,
        facebookId = user.facebookId,
        photoUrl = !string.IsNullOrEmpty(user.photoUrl) ? user.photoUrl : "/assets/images/profile-pic.png",
        token = jwt
      });


      return Ok();
    }


    [AllowAnonymous]
    [HttpGet("gettwittertoken")]
    public async Task<IActionResult> GetTwitterToken()
    {
      var s = await getRequestToken();

      return Ok(new
      {
        s.oauth_token,
        s.oauth_token_secret,
        s.oauth_authorize_url,
        s.oauth_oauth_verifier
      }
      );
    }

    //I think i can delete this
    [AllowAnonymous]
    [HttpGet("gettwitteraccess")]
    public async Task<IActionResult> GetTwitterAccess(string accessToken, string authVerifier)
    {

      var s = await getAccessToken(accessToken, authVerifier);

      if (s == null)
      {
        return BadRequest("Twitter login failed");
      }

      var user = await _userManager.FindByEmailAsync(s.email);
      string password = Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8);

      if (user == null)
      {
        var u = new GXUser()
        {
          Email = s.email,
          UserName = s.email,
          googleId = "",
          photoUrl = s.profile_image_url_https,
          firstName = s.name,
          lastName = "",
          gender = "",
          dateJoined = DateTime.Now
        };

        var result = await _userManager.CreateAsync(u, password);
        if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

        user = await _userManager.FindByEmailAsync(s.email);

      }
      else
      {
        user.twitterId = s.id_str;
        user.photoUrl = s.profile_image_url_https;
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
      }

      var identity = await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(user.UserName, user.Id));
      var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, user.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });


      return Ok(new
      {
        Id = user.Id,
        userName = user.UserName,
        firstName = user.firstName,
        lastName = user.lastName,
        email = user.Email,
        facebookId = user.facebookId,
        photoUrl = !string.IsNullOrEmpty(user.photoUrl) ? user.photoUrl : "/assets/images/profile-pic.png",
        token = jwt
      });


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

    private async Task<OAuthResponse> getRequestToken()
    {
      string nonce = oAuthUtil.GetNonce();
      string timeStamp = oAuthUtil.GetTimeStamp();

      string sigBaseStringParams = "oauth_consumer_key=" + "5R7Y1dJMc26yEdzFEbLWCZWKg";

      sigBaseStringParams += "&" + "oauth_nonce=" + nonce;
      sigBaseStringParams += "&" + "oauth_signature_method=" + "HMAC-SHA1";
      sigBaseStringParams += "&" + "oauth_timestamp=" + timeStamp;
      sigBaseStringParams += "&" + "oauth_version=1.0";
      string sigBaseString = "POST&";
      sigBaseString += Uri.EscapeDataString("https://api.twitter.com/oauth/request_token") + "&" + Uri.EscapeDataString(sigBaseStringParams);

      byte[] content = Encoding.UTF8.GetBytes(sigBaseString);
      HMACSHA1 hmac = new HMACSHA1(Encoding.ASCII.GetBytes("Ly2vdzPf23DfYlFPruxloVT4ix93Y9hmXepngPbQWRUHMPeZZs" + "&"));
      hmac.ComputeHash(content);

      string signature = Convert.ToBase64String(hmac.Hash);
      signature = signature.Replace("-", "");


      //string signature = oAuthUtil.GetSignature(sigBaseString, "Ly2vdzPf23DfYlFPruxloVT4ix93Y9hmXepngPbQWRUHMPeZZs");

      var responseText = await oAuthUtil.PostData("https://api.twitter.com/oauth/request_token", sigBaseStringParams + "&oauth_signature=" + Uri.EscapeDataString(signature));

      if (!string.IsNullOrEmpty(responseText))
      {
        string oauth_token = null;
        string oauth_token_secret = null;
        string oauth_authorize_url = null;
        string oauth_oauth_verifier = null;
        string[] keyValPairs = responseText.Split('&');

        for (int i = 0; i < keyValPairs.Length; i++)
        {
          String[] splits = keyValPairs[i].Split('=');
          switch (splits[0])
          {
            case "oauth_token":
              oauth_token = splits[1];
              break;
            case "oauth_token_secret":
              oauth_token_secret = splits[1];
              break;
            case "xoauth_request_auth_url":
              oauth_authorize_url = splits[1];
              break;
            case "oauth_verifier":
              oauth_oauth_verifier = splits[1];
              break;
          }
        }

        //requestToken.Text = oauth_token;
        //requestTokenSecretKey.Text = oauth_token_secret;
        //oAuthAuthorizeLink.Content = Uri.UnescapeDataString(_twitterAuthorizeUrl + "?oauth_token=" + oauth_token);

        return new OAuthResponse()
        {
          oauth_token = oauth_token,
          oauth_token_secret = oauth_token_secret,
          oauth_authorize_url = oauth_authorize_url,
          oauth_oauth_verifier = oauth_oauth_verifier
        };

      }

      return null;
    }

    private async Task<TwitterUserModel> getAccessToken(string authToken, string authVerifier)
    {

      GXUser user = null;
      TwitterUserModel twUser = null;
      string jwt = "";

      string nonce = oAuthUtil.GetNonce();
      string timeStamp = oAuthUtil.GetTimeStamp();

      string sigBaseStringParams = "oauth_consumer_key=" + "5R7Y1dJMc26yEdzFEbLWCZWKg";

      sigBaseStringParams += "&" + "oauth_nonce=" + nonce;
      sigBaseStringParams += "&" + "oauth_signature_method=" + "HMAC-SHA1";
      sigBaseStringParams += "&" + "oauth_timestamp=" + timeStamp;
      sigBaseStringParams += "&" + "oauth_token=" + authToken;
      sigBaseStringParams += "&" + "oauth_verifier=" + authVerifier;
      sigBaseStringParams += "&" + "oauth_version=1.0";
      string sigBaseString = "POST&";
      sigBaseString += Uri.EscapeDataString("https://api.twitter.com/oauth/access_token") + "&" + Uri.EscapeDataString(sigBaseStringParams);

      byte[] content = Encoding.UTF8.GetBytes(sigBaseString);
      HMACSHA1 hmac = new HMACSHA1(Encoding.ASCII.GetBytes("Ly2vdzPf23DfYlFPruxloVT4ix93Y9hmXepngPbQWRUHMPeZZs" + "&"));
      hmac.ComputeHash(content);

      string signature = Convert.ToBase64String(hmac.Hash);
      signature = signature.Replace("-", "");


      //string signature = oAuthUtil.GetSignature(sigBaseString, "Ly2vdzPf23DfYlFPruxloVT4ix93Y9hmXepngPbQWRUHMPeZZs");

      var responseText = await oAuthUtil.PostData("https://api.twitter.com/oauth/access_token", sigBaseStringParams + "&oauth_signature=" + Uri.EscapeDataString(signature));

      if (!string.IsNullOrEmpty(responseText))
      {
        string oauth_token = null;
        string oauth_token_secret = null;
        string oauth_authorize_url = null;
        string oauth_oauth_verifier = null;
        string user_id = null;
        string screen_name = null;

        string[] keyValPairs = responseText.Split('&');

        for (int i = 0; i < keyValPairs.Length; i++)
        {
          String[] splits = keyValPairs[i].Split('=');
          switch (splits[0])
          {
            case "oauth_token":
              oauth_token = splits[1];
              break;
            case "oauth_token_secret":
              oauth_token_secret = splits[1];
              break;
            case "xoauth_request_auth_url":
              oauth_authorize_url = splits[1];
              break;
            case "oauth_verifier":
              oauth_oauth_verifier = splits[1];
              break;
            case "user_id":
              user_id = splits[1];
              break;
            case "screen_name":
              screen_name = splits[1];
              break;
          }
        }

        //requestToken.Text = oauth_token;
        //requestTokenSecretKey.Text = oauth_token_secret;
        //oAuthAuthorizeLink.Content = Uri.UnescapeDataString(_twitterAuthorizeUrl + "?oauth_token=" + oauth_token);

        var oa = new OAuthResponse();

        if (oauth_token != null && oauth_token_secret != null)
        {

          //var credentialsText = Verify_Credentials("5R7Y1dJMc26yEdzFEbLWCZWKg", "Ly2vdzPf23DfYlFPruxloVT4ix93Y9hmXepngPbQWRUHMPeZZs", oauth_token, oauth_token_secret);
          var credentialsText = GetTwitterUser("5R7Y1dJMc26yEdzFEbLWCZWKg",
            "Ly2vdzPf23DfYlFPruxloVT4ix93Y9hmXepngPbQWRUHMPeZZs", oauth_token, oauth_token_secret);
          if (credentialsText.IndexOf("Error:") < 0 && !string.IsNullOrEmpty(credentialsText))
          {
            try
            {
              twUser = JsonConvert.DeserializeObject<TwitterUserModel>(credentialsText);
            }catch (Exception ex)
            {
              return null;
            }
            

          }
        }


      }

      return twUser;
    }

    public string GetTwitterUser(string ConsumerKey, string ConsumerSecret, string auth_token, string auth_secret)
    {
      // see all comments from GenerateTokenUrl as they apply here as well
      string Nonce = Convert.ToBase64String(new ASCIIEncoding().GetBytes(DateTime.Now.Ticks.ToString()));
      TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
      string timestamp = Convert.ToInt64(ts.TotalSeconds).ToString();
      TwitterUrls TwitterUrls = new TwitterUrls("https://api.twitter.com/1.1/account/verify_credentials.json");
      List<KeyValuePair<string, string>> Parameters = new List<KeyValuePair<string, string>>();
      Parameters.Add(new KeyValuePair<string, string>("include_email", "true"));
      Parameters.Add(new KeyValuePair<string, string>("oauth_consumer_key", ConsumerKey));
      Parameters.Add(new KeyValuePair<string, string>("oauth_nonce", Nonce));
      Parameters.Add(new KeyValuePair<string, string>("oauth_signature_method", "HMAC-SHA1"));
      Parameters.Add(new KeyValuePair<string, string>("oauth_timestamp", timestamp));
      Parameters.Add(new KeyValuePair<string, string>("oauth_token", auth_token));
      Parameters.Add(new KeyValuePair<string, string>("oauth_version", "1.0"));
      string signature = TwitterUrls.GenerateSignature(ConsumerSecret, Parameters, auth_secret);
      Parameters.Insert(3, new KeyValuePair<string, string>("oauth_signature", signature));

      string retVal = string.Empty;

      string url = TwitterUrls.GenerateCallingUrls(Parameters);
      using (WebClient client = new WebClient())
      {
        retVal = client.DownloadString(url);
      }
      return retVal;
    }

    private string EncodeCharacters(string data)
    {
      //as per OAuth Core 1.0 Characters in the unreserved character set MUST NOT be encoded
      //unreserved = ALPHA, DIGIT, '-', '.', '_', '~'
      if (data.Contains("!"))
        data = data.Replace("!", "%21");
      if (data.Contains("'"))
        data = data.Replace("'", "%27");
      if (data.Contains("("))
        data = data.Replace("(", "%28");
      if (data.Contains(")"))
        data = data.Replace(")", "%29");
      if (data.Contains("*"))
        data = data.Replace("*", "%2A");
      if (data.Contains(","))
        data = data.Replace(",", "%2C");

      return data;
    }



  }
}
