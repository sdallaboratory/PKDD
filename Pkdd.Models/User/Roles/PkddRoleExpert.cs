using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pkdd.Models.Users.Roles
{
    public class PkddRoleExpert : PkddRoleBase
    {
        public PkddRoleExpert() : base("expert")
        {
        }

        [NotMapped]
        public override PkddRoles EnumValue => PkddRoles.Expert;
    }
}
