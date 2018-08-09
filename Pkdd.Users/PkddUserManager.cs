using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pkdd.Models.Users;
using Pkdd.Models.Users.Roles;

namespace Pkdd.Users
{
    class PkddUserManager : IPkddUserManager
    {
        public Task AddToRoleAsync(PkddUser user, PkddRoles role)
        {
            throw new NotImplementedException();
        }

        public Task AddToRoleAsync(PkddUser user, string roleName)
        {
            throw new NotImplementedException();
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

        public Task<bool> IsInRoleAsync(PkddUser user, string roleName)
        {
            throw new NotImplementedException();
        }

        public Task RemoveFromRoleAsync(PkddUser user, PkddRoles role)
        {
            throw new NotImplementedException();
        }

        public Task RemoveFromRoleAsync(PkddUser user, string roleName)
        {
            throw new NotImplementedException();
        }

        public Task UnbanAsync(PkddUser user)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(PkddUser user)
        {
            throw new NotImplementedException();
        }
    }
}
