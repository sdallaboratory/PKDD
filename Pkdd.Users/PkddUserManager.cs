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

        public Task AddToRoleAsync(PkddUser user, PkddRoles role)
        {
            return AddToRoleAsync(user, role.ToString());
        }

        public async Task AddToRoleAsync(PkddUser user, string roleName)
        {
            await _userManager.AddToRoleAsync(user, roleName);
        }

        public async Task BanAsync(PkddUser user)
        {
            user.IsBanned = true;
            await UpdateAsync(user);
        }

        public async Task ConfirmAsync(PkddUser user)
        {
            user.IsConfirmed = true;
            await UpdateAsync(user);
        }

        public async Task<PkddUser> CreateAsync(string email, string password, string name)
        {
            if (await _userManager.FindByEmailAsync(email) != null)
                throw new Exception("Пользователь с таким адресом электронной почты уже зарегистрирован в системе.");

            PkddUser user = new PkddUser() { Email = email, Name = name };
            IdentityResult result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
                throw new Exception("Не удалось создать новый аккаунт пользователя.");

            return user;
        }

        public async Task DeleteAsync(PkddUser user)
        {
            user.MarkDeleted();
            await UpdateAsync(user);
        }

        public async Task<PkddUser> FindAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public Task<bool> IsInRoleAsync(PkddUser user, PkddRoles role)
        {
            return IsInRoleAsync(user, role.ToString());
        }

        public async Task<bool> IsInRoleAsync(PkddUser user, string roleName)
        {
            return await _userManager.IsInRoleAsync(user, roleName);
        }

        public Task RemoveFromRoleAsync(PkddUser user, PkddRoles role)
        {
            return RemoveFromRoleAsync(user, role.ToString());
        }

        public async Task RemoveFromRoleAsync(PkddUser user, string roleName)
        {
            await _userManager.RemoveFromRoleAsync(user, roleName);
        }

        public async Task UnbanAsync(PkddUser user)
        {
            user.IsBanned = false;
            await UpdateAsync(user);
        }

        public async Task UpdateAsync(PkddUser user)
        {
            await _userManager.UpdateAsync(user);
        }
    }
}
