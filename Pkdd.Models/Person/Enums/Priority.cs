using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Pkdd.Models.Persons
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Priority
    {
        /// <summary>
        /// Обычная степень важности
        /// </summary>
        Usual = 0,

        /// <summary>
        /// Важный актор
        /// </summary>
        Important = 1,

        /// <summary>
        /// Очень важный актор
        /// </summary>
        VeryImportant = 2,

        /// <summary>
        /// Невероятно важный, просто до ужаса!
        /// </summary>
        Crucial = 3
    }
}