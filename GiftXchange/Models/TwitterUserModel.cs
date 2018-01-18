using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftXchange.Models
{
  public class TwitterUserModel
  {
    public long id { get; set; }
    public string id_str { get; set; }
    public string name { get; set; }
    public string screen_name { get; set; }
    public string location { get; set; }
    public string description { get; set; }
    public string profile_background_color { get; set; }
    public string profile_background_image_url { get; set; }
    public string profile_background_image_url_https { get; set; }
    public string profile_image_url { get; set; }
    public string profile_image_url_https { get; set; }
    public string email { get; set; }
  }
}
