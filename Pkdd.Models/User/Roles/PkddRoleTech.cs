using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pkdd.Models.Users.Roles
{
    class PkddRoleTech : PkddRoleBase
    {
        public PkddRoleTech() : base("tech")
        {
        }

        [NotMapped]
        public override PkddRoles EnumValue => PkddRoles.Tech;
    }
}
