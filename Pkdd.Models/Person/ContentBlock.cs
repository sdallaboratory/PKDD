using Pkdd.Abstractions.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Enums = Pkdd.Models.Person.Enums;

namespace Pkdd.Models.Person
{
    public class ContentBlock: EntityBase<ContentBlock>
    {
        public string Tilte { get; set; }   

        public string Subtitle { get; set; }

        [Required]
        public Enums.ContentType Type { get; set; }

        [Required]
        public string Content { get; set; }

        public List<ContentBlock> SubBlocks { get; set; }

        public string Comment { get; set; }

        /// <summary>
        /// String with format  "\/*\d+" (int/int/int/...)
        /// </summary>
        [RegularExpression(@"\/*\d+")]
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
