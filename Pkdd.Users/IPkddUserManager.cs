using Pkdd.Models.Users;
using Pkdd.Models.Users.Roles;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pkdd.Users
{
    /// Provides functionality for working with <see cref="PkddUser"/> and <see cref="PkddRoleBase"/>. Incapsulates data transfer with the backing store.
    public interface IPkddUserManager
    {
        /// <summary>
        /// Creates a new user instance based on provided user data and save it to database.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        Task<PkddUser> CreateAsync(string email, string password, string name);

        /// <summary>
        /// Updates a user's data in the backing store.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task UpdateAsync(PkddUser user);

        /// <summary>
        /// Marks a user as deleted.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task DeleteAsync(PkddUser user);

        /// <summary>
        /// Returns an instance of a user with specified email or <see cref="null"/> if the one doesn't exist.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        Task<PkddUser> FindAsync(string email);

        /// <summary>
        /// Returns an instance of a user with specified id or <see cref="null"/> if the one doesn't exist.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<PkddUser> FindAsync(int id);

        Task<List<PkddUser>> FindAllAsync();

        /// <summary>
        /// Marks a user as banned.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task BanAsync(PkddUser user);

        /// <summary>
        /// Unbans a user.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task UnbanAsync(PkddUser user);

        /// <summary>
        /// Marks a user as confirmed.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task ConfirmAsync(PkddUser user);

        /// <summary>
        /// Adds a user to specified role.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        Task AddToRoleAsync(PkddUser user, PkddRoles role);

        /// <summary>
        /// Adds a user to specified role.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        Task AddToRoleAsync(PkddUser user, string roleName);

        /// <summary>
        /// Add user to specified roles
        /// </summary>
        /// <param name="user"></param>
        /// <param name="roleNames"></param>
        /// <returns></returns>
        Task AddToRolesAsync(PkddUser user, List<string> roleNames);

        /// <summary>
        /// Removes a user from specified role.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        Task RemoveFromRoleAsync(PkddUser user, PkddRoles role);

        /// <summary>
        /// Removes a user from specified role.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        Task RemoveFromRoleAsync(PkddUser user, string roleName);

        /// <summary>
        /// Checks if a user is in specified role.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        Task<bool> IsInRoleAsync(PkddUser user, PkddRoles role);

        /// <summary>
        /// Checks if a user is in specified role.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        Task<bool> IsInRoleAsync(PkddUser user, string roleName);

        /// <summary>
        /// Returns an array of user's roles
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<string[]> GetRolesAsync(PkddUser user);
    }
}
