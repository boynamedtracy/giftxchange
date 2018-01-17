using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace GiftXchange.Helpers
{
  public class OAuthUtil
  {
    public string GetNonce()
    {
      Random rand = new Random();
      int nonce = rand.Next(1000000000);
      return nonce.ToString();
    }

    public string GetTimeStamp()
    {
      TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
      return Convert.ToInt64(ts.TotalSeconds).ToString();
    }

    public async Task<string> PostData(string url, string postData)
    {
      try
      {
        HttpClient httpClient = new HttpClient();
        httpClient.MaxResponseContentBufferSize = int.MaxValue;
        httpClient.DefaultRequestHeaders.ExpectContinue = false;
        HttpRequestMessage requestMsg = new HttpRequestMessage();
        requestMsg.Content = new StringContent(postData);
        requestMsg.Method = new HttpMethod("POST");
        requestMsg.RequestUri = new Uri(url, UriKind.Absolute);
        requestMsg.Content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
        var response = await httpClient.SendAsync(requestMsg);
        return await response.Content.ReadAsStringAsync();
      }
      catch (Exception Err)
      {
        throw;
      }
    }

    public async Task<string> GetData(string url)
    {
      try
      {
        HttpClient httpClient = new HttpClient();
        httpClient.MaxResponseContentBufferSize = int.MaxValue;
        httpClient.DefaultRequestHeaders.ExpectContinue = false;
        HttpRequestMessage requestMsg = new HttpRequestMessage();       
        requestMsg.Method = new HttpMethod("GET");
        requestMsg.RequestUri = new Uri(url, UriKind.Absolute);
        requestMsg.Content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
        var response = await httpClient.SendAsync(requestMsg);
        return await response.Content.ReadAsStringAsync();
      }
      catch (Exception Err)
      {
        throw;
      }
    }

    public string GetSignature(string concat)
    {
      var s = "";

      concat = "POST&" + EncodeToUpper("http://api.twitter.com/oauth/request_token") +
          "&" + concat;

      return s;
    }

    private string EncodeToUpper(string raw)
    {
      raw = HttpUtility.UrlEncode(raw);
      return Regex.Replace(raw, "(%[0-9a-f][0-9a-f])", c => c.Value.ToUpper());
    }
  }
}
