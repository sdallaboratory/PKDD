
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Pkdd.Models.Persons.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Sexes
    {
        Undefined = 0,
        Male = 1,
        Female = 2,
    }
}
