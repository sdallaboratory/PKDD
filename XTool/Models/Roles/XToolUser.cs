using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.Roles
{
    public class XToolUser : IdentityUser<int>
    {
        public DateTime Birthday { get; set; }

        /// <summary>
        /// Должность и место работы.
        /// </summary>
        public string Position { get; set; }
    }
}
