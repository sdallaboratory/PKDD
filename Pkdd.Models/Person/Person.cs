using Newtonsoft.Json;
using Pkdd.Abstractions.Entity;
using Pkdd.Models.Person;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Pkdd.Models.Person
{
    [JsonObject]
    public class Person : EntityBase<Person>
    {
        /// <summary>
        /// ФИО актора
        /// </summary>
        [JsonProperty("name")]
        [Required, StringLength(200)]
        public string Name { get; set; }

        /// <summary>
        /// Пол актора
        /// </summary>
        [JsonProperty("sex")]
        public Sexes Sex { get; set; }

        /// <summary>
        /// Дата рождения актора
        /// </summary>
        [JsonProperty("birthday")]
        public DateTime Birthday { get; set; }

        /// <summary>
        /// Перечисление текущих мест работы и соответсвующих должностей
        /// </summary>
        [StringLength(500)]
        [JsonProperty("position")]
        public string Position { get; set; }

        [JsonProperty("bioBlock")]
        public BaseBioBlock BioBlock { get; set; }

        [NotMapped]
        public int Age => DateTime.Now.Year - Birthday.Year;

        public override Person Update(Person entity)
        {
            Name = entity.Name;
            Sex = entity.Sex;
            Birthday = entity.Birthday;
            Position = entity.Position;
            MarkUpdated();
            return this;
        }

    }
}
