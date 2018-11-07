﻿using Newtonsoft.Json;
using Pkdd.Abstractions.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Enums = Pkdd.Models.Person.Enums;

namespace Pkdd.Models.Person
{
    [JsonObject]
    public class ContentBlock: IEntity<ContentBlock>
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
        /// String with format  "\/?\d+" (int/int/int/...)
        /// </summary>
        [RegularExpression(@"\/?\d+")]
        [JsonProperty("order")]
        public string Order { get; set; }
        public int Id { get; set; }
        public bool IsDeleted { get; set; }

        public ContentBlock Update(ContentBlock content)
        {
            Tilte = content.Tilte;
            Subtitle = content.Subtitle;
            Type = content.Type;
            Content = content.Content;
            Comment = content.Comment;
            Order = content.Order;
            return this;
        }

        private readonly string orderPattern = @"\/?\d+";

        public bool CheckOrder(string order)
        {
            bool isMatch = Regex.IsMatch(order, orderPattern);
            if(!isMatch)
            {
                return false;
            }
            string[] thisOrder = Order.Split('/');
            string[] checkOrder = order.Split('/');
            if(thisOrder.Length != checkOrder.Length)
            {
                return false;
            }
            return thisOrder.SequenceEqual(checkOrder);
        }

        public void MarkCreated()
        {
            throw new NotImplementedException();
        }

        public void MarkDeleted()
        {
            throw new NotImplementedException();
        }

        public void MarkUpdated()
        {
            throw new NotImplementedException();
        }
    }
}
