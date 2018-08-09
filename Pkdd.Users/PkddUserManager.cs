using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
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
            throw new NotImplementedException();
        }

        public async Task AddToRoleAsync(PkddUser user, string roleName)
        {
            await _userManager.AddToRoleAsync(user, roleName);
        }

        public Task BanAsync(PkddUser user)
        {
            throw new NotImplementedException();
        }

        public Task ConfirmAsync(PkddUser user)
        {
            throw new NotImplementedException();
        }

        public Task<PkddUser> CreateAsync(string email, string password, string name)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(PkddUser user)
        {
            throw new NotImplementedException();
        }

        public Task<PkddUser> FindAsync(string email)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsInRoleAsync(PkddUser user, PkddRoles role)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> IsInRoleAsync(PkddUser user, string roleName)
        {
            return await _userManager.IsInRoleAsync(user, roleName);
        }

        public Task RemoveFromRoleAsync(PkddUser user, PkddRoles role)
        {
            throw new NotImplementedException();
        }

        public async Task RemoveFromRoleAsync(PkddUser user, string roleName)
        {
            await _userManager.RemoveFromRoleAsync(user, roleName);
        }

        public Task UnbanAsync(PkddUser user)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(PkddUser user)
        {
            throw new NotImplementedException();
        }
    }
}
