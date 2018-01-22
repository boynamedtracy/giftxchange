using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GiftXchange.Helpers
{
    public static class Utilities
    {
    public static string StripSpecialCharacters(string s, string sep = "-")
    {
      if (string.IsNullOrEmpty(s))
        return "";

      var rv = s;

      rv = Regex.Replace(rv, @"\s+", "{SEP}");
      rv = Regex.Replace(rv, @"[^0-9a-zA-Z\{\}]+", "");
      rv = rv.Replace("{SEP}", sep);
      rv = Regex.Replace(rv, @"\.", "");
      return rv;
    }
    public static bool ContainsString(string s, string v, char sep = ',')
    {
      var rv = false;

      foreach (var x in s.Split(sep))
      {
        string y = x.Trim();
        if (!string.IsNullOrEmpty(y))
        {
          if (y.IndexOf(v.Trim(), StringComparison.InvariantCultureIgnoreCase) > -1)
          {
            if (y.Substring(0, v.Length).Equals(v, StringComparison.InvariantCultureIgnoreCase))
            {
              rv = true;
              break;
            }
          }
        }

      }

      return rv;
    }
  }
}

