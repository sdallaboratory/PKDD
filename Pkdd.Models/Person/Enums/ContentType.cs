using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Models.Persons.Enums
{
    //[JsonConverter(typeof(StringEnumConverter))]
    public enum ContentType
    {
        Container,
        PhotoContainer,
        VideoConteiner,
        Text,
        DateText,
        Photo,
        Video,
        Publications
    }
}
