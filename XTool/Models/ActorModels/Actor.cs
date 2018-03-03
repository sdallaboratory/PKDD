using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.ActorModels
{
    public class Actor
    {
        #region Key Info

        /// <summary>
        /// ФИО актора
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Пол актора
        /// </summary>
        public Sexes Sex { get; set; }

        /// <summary>
        /// Дата рождения актора
        /// </summary>
        public DateTime Birthday { get; set; }

        /// <summary>
        /// Перечисление текущих мест работы и соответсвующих должностей
        /// </summary>
        public string Position { get; set; }

        #endregion

        #region All Info

        /// <summary>
        /// Набор фотографий актора
        /// </summary>
        public virtual List<Photo> Photos { get; set; }

        /// <summary>
        /// Список публикаций и выступлений актора
        /// </summary>
        public virtual List<Publication> Publications { get; set; }

        /// <summary>
        /// Список видеозаписей
        /// </summary>
        public virtual List<Video> Videos { get; set; }

        /// <summary>
        /// Список событий в биографии актора
        /// </summary>
        public virtual List<Event> BiograpphyEvents { get; set; }

        /// <summary>
        /// Список периодов с событиями в карьере актора
        /// </summary>
        public virtual List<TimePeriod> CareerPeriods { get; set; }

        /// <summary>
        /// Описание религиозных взглядов актора
        /// </summary>
        public string ReligionViews { get; set; }

        /// <summary>
        /// Описание социальной активности актора
        /// </summary>
        public string SocialActivity { get; set; } 

        #endregion

        #region CustomSections

        /// <summary>
        /// Список пользовательских секций с дополнительной поясняющей информацией
        /// </summary>
        public virtual List<CustomSection> CustomSection { get; set; }

        #endregion
    }
}
