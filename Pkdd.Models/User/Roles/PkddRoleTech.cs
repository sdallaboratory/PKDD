using System.ComponentModel.DataAnnotations.Schema;

namespace Pkdd.Models.Users.Roles
{
    public class PkddRoleTech : PkddRoleBase
    {
        public PkddRoleTech() : base("tech")
        {
        }

        [NotMapped]
        public override PkddRoles EnumValue => PkddRoles.Tech;
    }
}
