using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Helpers
{
  public class OAuthResponse
  {
    public string oauth_token { get; set; }
    public string oauth_token_secret { get; set; }
    public string oauth_authorize_url { get; set; }

    public string oauth_oauth_verifier { get; set; }
    public string user_id { get; set; }
    public string screen_name { get; set; }
  }
}
