using Newtonsoft.Json;
using Pkdd.Abstractions.Entity;
using Pkdd.Models.Persons.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace Pkdd.Models.Persons
{
    public class Person : EntityBase<Person>
    {
        [Required, StringLength(200)]
        public string Name { get; set; }

        public Sexes Sex { get; set; }

        public DateTime Birthday { get; set; }

        /// <summary>
        /// Перечисление текущих мест работы и соответсвующих должностей
        /// </summary>
        [StringLength(500)]
        public string Position { get; set; }

        public Priority Priority { get; set; }

        public BaseBioBlock BioBlock { get; set; }

        public override Person Update(Person entity)
        {
            Name = entity.Name;
            Sex = entity.Sex;
            Birthday = entity.Birthday;
            Position = entity.Position;
            this.MarkUpdated();
            return this;
        }

    }
}
