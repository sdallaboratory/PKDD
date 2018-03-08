using System;
using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using XTool.Models.ActorModels.BaseTypes;

namespace XTool.Models.ActorModels
{
    public class Video : Media
    {
        public int ActorId { get; set; }

        public string Host => new Uri(Url).Host; //Url.Split("//").Last().Split('/').First();

        public string YouTubeId => Host == "youtube.com" ? HttpUtility.ParseQueryString(new Uri(Url).Query)["v"] : null;
    }
}