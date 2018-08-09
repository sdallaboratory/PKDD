using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pkdd.Models.Users.Roles
{
    public class PkddRoleAdmin : PkddRoleBase
    {
        public PkddRoleAdmin() : base("admin")
        {
        }

        [NotMapped]
        public override PkddRoles EnumValue => PkddRoles.Admin;
    }
}
