using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Pkdd.Abstractions.Entity;
using Pkdd.Database;
using Pkdd.Models.Users;
using Pkdd.Models.Users.Roles;

namespace Pkdd.Users
{
    /// <summary>
    /// Provides functionality for working with <see cref="PkddUser"/> and <see cref="PkddRoleBase"/>. Incapsulates data transfer with the backing store.
    /// </summary>
    class PkddUserManager : IPkddUserManager
    {
        private readonly UserManager<PkddUser> _userManager;
        private readonly RoleManager<PkddRoleBase> _roleManager;
        private readonly SignInManager<PkddUser> _signInManager;
        private readonly PkddDbContext _context;

        public PkddUserManager(UserManager<PkddUser> userManager, RoleManager<PkddRoleBase> roleManager, SignInManager<PkddUser> signInManager, PkddDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _context = context;
        }

        /// <summary>
        /// Adds a user to specified role.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        public Task AddToRoleAsync(PkddUser user, PkddRoles role)
        {
            return AddToRoleAsync(user, role.ToString());
        }

        /// <summary>
        /// Adds a user to specified role.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="roleName"></param>
        /// <returns></returns>
        public async Task AddToRoleAsync(PkddUser user, string roleName)
        {
            await _userManager.AddToRoleAsync(user, roleName);
        }

        /// <summary>
        /// Marks a user as banned.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task BanAsync(PkddUser user)
        {
            user.IsBanned = true;
            await UpdateAsync(user);
        }

        /// <summary>
        /// Marks a user as confirmed.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task ConfirmAsync(PkddUser user)
        {
            user.IsConfirmed = true;
            await UpdateAsync(user);
        }

        /// <summary>
        /// Creates a new user instance based on provided user data and save it to database.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public async Task<PkddUser> CreateAsync(string email, string password, string name)
        {
            if (await _userManager.FindByEmailAsync(email) != null)
                throw new Exception("Пользователь с таким адресом электронной почты уже зарегистрирован в системе.");

            PkddUser user = new PkddUser() { Email = email, Name = name };
            user.Init();
            user.FillUserName();

            IdentityResult result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
                throw new Exception("Не удалось создать новый аккаунт пользователя.");

            return user;
        }

        /// <summary>
        /// Marks a user as deleted.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task DeleteAsync(PkddUser user)
        {
            user.MarkDeleted();
            await UpdateAsync(user);
        }

        /// <summary>
        /// Returns an instance of a user with specified email or <see cref="null"/> if the one doesn't exist.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task<PkddUser> FindAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        /// <summary>
        /// Checks if a user is in specified role.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        public Task<bool> IsInRoleAsync(PkddUser user, PkddRoles role)
        {
            return IsInRoleAsync(user, role.ToString());
        }

        /// <summary>
        /// Checks if a user is in specified role.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="roleName"></param>
        /// <returns></returns>
        public async Task<bool> IsInRoleAsync(PkddUser user, string roleName)
        {
            return await _userManager.IsInRoleAsync(user, roleName);
        }

        /// <summary>
        /// Removes a user from specified role.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        public Task RemoveFromRoleAsync(PkddUser user, PkddRoles role)
        {
            return RemoveFromRoleAsync(user, role.ToString());
        }

        /// <summary>
        /// Removes a user from specified role.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="roleName"></param>
        /// <returns></returns>
        public async Task RemoveFromRoleAsync(PkddUser user, string roleName)
        {
            await _userManager.RemoveFromRoleAsync(user, roleName);
        }

        /// <summary>
        /// Unbans a user.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task UnbanAsync(PkddUser user)
        {
            user.IsBanned = false;
            await UpdateAsync(user);
        }

        /// <summary>
        /// Updates a user's data in the backing store.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task UpdateAsync(PkddUser user)
        {
            await _userManager.UpdateAsync(user);
        }
    }
}
