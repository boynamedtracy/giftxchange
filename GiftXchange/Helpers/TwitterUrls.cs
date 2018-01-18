using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GiftXchange.Helpers
{
  public class TwitterUrls
  {
    string _EndPointUrl = string.Empty;
    URLEncoder urlEncoder = new URLEncoder();
    public TwitterUrls(string EndPointUrl)
    {
      _EndPointUrl = EndPointUrl;
    }
    public string GenerateSignature(string ConsumerSecret, List<KeyValuePair<string, string>> Parameters, string TokenSecret = null)
    {

      string SignatureInner = string.Empty;
      // start the string to be included in the signature with "GET&" ... again just modeling this after the PHP translation
      string Signature = "GET&";
      // the first & is not urlencoded
      Signature += urlEncoder.UrlEncode(_EndPointUrl) + "&";
      // loop over the parameters and add them to the signatures string
      foreach (KeyValuePair<string, string> item in Parameters)
      {
        if (item.Key == "oauth_callback")
        {
          // the callback url needs to be encoded twice, so do it first now
          SignatureInner += item.Key + "=" + urlEncoder.UrlEncode(item.Value) + "&";
        }
        else
        {
          SignatureInner += item.Key + "=" + item.Value + "&";
        }
      }
      // strip off the last "&"
      SignatureInner = SignatureInner.Substring(0, SignatureInner.Length - 1);
      // url encode the inner signature
      SignatureInner = urlEncoder.UrlEncode(SignatureInner);
      // add the inner signature to the signature
      Signature += SignatureInner;
      // url encode the whole thing and include the token secret as part of the key if it's passed in
      return urlEncoder.UrlEncode(new HashHMac().CreateHMacHash(ConsumerSecret + "&" + (!string.IsNullOrEmpty(TokenSecret) ? TokenSecret : ""), Signature));
    }

    public string GenerateCallingUrls(List<KeyValuePair<string, string>> Parameters)
    {
      // this method generates the actual url to call, see comments from above method
      string url = _EndPointUrl + "?";
      foreach (KeyValuePair<string, string> item in Parameters)
      {
        if (item.Key == "oauth_callback")
        {
          url += item.Key + "=" + urlEncoder.UrlEncode(item.Value) + "&";
        }
        else
        {
          url += item.Key + "=" + item.Value + "&";
        }
      }
      url = url.Substring(0, url.Length - 1);
      return url;
    }
  }

  public class URLEncoder
  {
    public string UrlEncode(string url)
    {
      // found this method here: http://www.codeproject.com/Questions/832905/Is-there-any-equivalent-for-rawurlencode-in-Csharp
      Dictionary<string, string> toBeEncoded = new Dictionary<string, string>() { { "%", "%25" }, { "!", "%21" }, { "#", "%23" }, { " ", "%20" },
        { "$", "%24" }, { "&", "%26" }, { "'", "%27" }, { "(", "%28" }, { ")", "%29" }, { "*", "%2A" }, { "+", "%2B" }, { ",", "%2C" },
        { "/", "%2F" }, { ":", "%3A" }, { ";", "%3B" }, { "=", "%3D" }, { "?", "%3F" }, { "@", "%40" }, { "[", "%5B" }, { "]", "%5D" } };
      Regex replaceRegex = new Regex(@"[%!# $&'()*+,/:;=?@\[\]]");
      MatchEvaluator matchEval = match => toBeEncoded[match.Value];
      string encoded = replaceRegex.Replace(url, matchEval);
      return encoded;
    }
  }

  public class HashHMac
  {
    public string CreateHMacHash(string key, string message)
    {
      // found this solution here: http://stackoverflow.com/questions/8780261/hmc-sha1-hash-java-producing-different-hash-output-than-c-sharp
      HMAC hasher = new HMACSHA1(Encoding.UTF8.GetBytes(key));
      byte[] data = hasher.ComputeHash(Encoding.UTF8.GetBytes(message));
      return Convert.ToBase64String(data);
    }
  }
}
