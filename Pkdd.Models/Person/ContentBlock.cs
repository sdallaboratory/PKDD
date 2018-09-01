using Newtonsoft.Json;
using Pkdd.Abstractions.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Enums = Pkdd.Models.Person.Enums;

namespace Pkdd.Models.Person
{
    [JsonObject]
    public class ContentBlock: EntityBase<ContentBlock>
    {
        [JsonProperty("title")]
        public string Tilte { get; set; }   

        [JsonProperty("subtitle")]
        public string Subtitle { get; set; }

        [JsonProperty("type")]
        [Required]
        public Enums.ContentType Type { get; set; }

        [JsonProperty("content")]
        [Required]
        public string Content { get; set; }

        [JsonProperty("subBlocks")]
        public List<ContentBlock> SubBlocks { get; set; }

        [JsonProperty("comment")]
        public string Comment { get; set; }

        /// <summary>
        /// String with format  "\/*\d+" (int/int/int/...)
        /// </summary>
        [RegularExpression(@"\/*\d+")]
        [JsonProperty("order")]
        public string Order { get; set; }

        public override ContentBlock Update(ContentBlock content)
        {
            Tilte = content.Tilte;
            Subtitle = content.Subtitle;
            Type = content.Type;
            Content = content.Content;
            Comment = content.Comment;
            Order = content.Order;
            MarkUpdated();
            return this;
        }
    }
}
