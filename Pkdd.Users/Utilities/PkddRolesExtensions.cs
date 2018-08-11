using Pkdd.Models.Users.Roles;

namespace Pkdd.Users.Utilities
{
    public static class PkddRolesExtensions
    {
        public static string ToString(this PkddRoles role)
        {
            string result = null;
            switch (role)
            {
                case PkddRoles.Admin:
                    result = "admin";
                    break;
                case PkddRoles.Expert:
                    result = "expert";
                    break;
                case PkddRoles.Tech:
                    result = "tech";
                    break;
            }
            return result;
        }
    }
}