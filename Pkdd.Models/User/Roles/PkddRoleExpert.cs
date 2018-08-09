using System.ComponentModel.DataAnnotations.Schema;

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
