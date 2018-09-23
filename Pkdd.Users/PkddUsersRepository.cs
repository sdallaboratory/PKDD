using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pkdd.Models.Users;

namespace Pkdd.Users
{
    class PkddUsersRepository : IPkddUserRepository
    {
        private readonly IPkddUserManager users;

        public PkddUsersRepository(IPkddUserManager users)
        {
            this.users = users;
        }

        public async Task<PkddUserInfo> GetAsync(int id)
        {
            PkddUser user = await users.FindAsync(id);
            return await ToPkddUserInfoAsync(user);
        }

        public async Task UpdateAsync(PkddUserInfo userInfo)
        {
            // TODO: handle roles changes. Handle fields changes
            return;
        }

        private async Task<PkddUserInfo> ToPkddUserInfoAsync(PkddUser user)
        {
            PkddUserInfo userInfo = new PkddUserInfo()
            {
                Id = user.Id,
                Name = user.FullName,
                Email = user.Email
            };
            userInfo.Roles = (await users.GetRolesAsync(user)).ToList();
            return userInfo;
        }
    }
}
