using Pkdd.Models.Users;
using Pkdd.Models.Users.Roles;
using System.Threading.Tasks;

namespace Pkdd.Users
{
    public interface IPkddSignInManager
    {
        Task<PkddUser> CreateAsync(string email, string password, string name);

        Task UpdateAsync(PkddUser user);

        Task DeleteAsync(PkddUser user);

        Task<PkddUser> FindAsync(string email);

        Task BanAsync(PkddUser user);

        Task UnbanAsync(PkddUser user);

        Task ConfirmAsync(PkddUser user);

        Task AddToRoleAsync(PkddUser user, PkddRoles role);
        Task AddToRoleAsync(PkddUser user, string roleName);

        Task RemoveFromRoleAsync(PkddUser user, PkddRoles role);
        Task RemoveFromRoleAsync(PkddUser user, string roleName);

        Task<bool> IsInRoleAsync(PkddUser user, PkddRoles role);
        Task<bool> IsInRoleAsync(PkddUser user, string roleName);
    }
}
