using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.Roles
{
    public class AdminRole : XToolRole, IUpdateble
    {
        /// <summary>
        /// Говорит о том, насколько этот админ крут. Левел даёся при регистрации.
        /// </summary>
        public int Level { get; set; }

        public AdminRole() : this("ADMIN")
        {
        }

        public AdminRole(string roleName) : base(roleName)
        {
        }

        public IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
