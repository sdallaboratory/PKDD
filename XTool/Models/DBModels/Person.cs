using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.DBModels
{
    /// <summary>
    /// Представляет класс персоны, вынесенной админом на оценку экспертам. 
    /// </summary>
    public class Person : IUpdateble
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime Birthday { get; set; }

        /// <summary>
        /// Должность персоны.
        /// </summary>
        public string Position { get; set; }

        /// <summary>
        /// Краткое описание персоны в 3-4 предложения.
        /// </summary>
        [MaxLength(1000, ErrorMessage = "Слишком длинное описание")]
        public string ShortInfo { get; set; }

        #region Bio

        public string Photo { get; set; }

        public string Publish { get; set; }

        public string Video { get; set; }

        public string Biography { get; set; }

        public string Career { get; set; }

        public string ReligiousViews { get; set; }

        public string Quotations { get; set; }

        public string SocialActivity { get; set; }

        #endregion

        public virtual ICollection<Conclusion> Conclusions { get; set; } = new List<Conclusion>();

        public DateTime Published { get; set; }

        public IUpdateble Update(IUpdateble source) 
        {
            Person temp = null;
            if(source != null && source is Person)
            {
                temp = source as Person;
                if (!string.IsNullOrWhiteSpace(temp.Name))
                    Name = temp.Name;
                Birthday = temp.Birthday;
                Position = temp.Position;
                Photo = temp.Photo;
                Publish = temp.Publish;
                Video = temp.Video;
                Biography = temp.Biography;
                Career = temp.Career;
                ReligiousViews = temp.ReligiousViews;
                Quotations = temp.Quotations;
                SocialActivity = temp.SocialActivity;
            }
            return temp;
        }
    }
}
