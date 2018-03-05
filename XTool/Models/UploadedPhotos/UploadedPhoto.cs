using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models.Roles;

namespace XTool.Models
{
    public class UploadedPhoto
    {
        public int Id { get; set; }

        /// <summary>
        /// Фотография, сериализованная в массив байтов
        /// </summary>
        public byte[] Content { get; set; }

        /// <summary>
        /// Пользователь, который загрузил фотографию
        /// </summary>
        public virtual XToolUser User { get; set; }

        public int UserId { get; set; }
    }
}
