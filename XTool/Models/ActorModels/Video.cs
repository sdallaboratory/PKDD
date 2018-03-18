using System;
using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using XTool.Models.ActorModels.BaseTypes;
using XTool.Data.ModelInterfaces;

namespace XTool.Models.ActorModels
{
    public class Video : Media
    {
        public int ActorId { get; set; }

        [NotMapped]
        public string Host => new Uri(Url).Host; //Url.Split("//").Last().Split('/').First();

        [NotMapped]
        public string YouTubeId => Host == "www.youtube.com" ? HttpUtility.ParseQueryString(new Uri(Url).Query)["v"] : null;

        public override IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}