using System.ComponentModel.DataAnnotations.Schema;

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
