using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pkdd.Database;
using Pkdd.Models.Users;

namespace Pkdd.Users
{
    class PkddUsersRepository : IPkddUserRepository
    {
        private readonly IPkddUserManager users;
        private readonly PkddDbContext context;

        public PkddUsersRepository(IPkddUserManager users, PkddDbContext context)
        {
            this.users = users;
            this.context = context;
        }

        public async Task<List<PkddUserInfo>> GetAllAsync()
        {
            List<PkddUserInfo> resultUsers = await ToPkddUsersInfoAsync(await users.FindAllAsync());
            var results = context.TestResults.ToList();
            foreach (var user in resultUsers)
            {
                user.ResultsCount = results.Where(tr => tr.PkddUserId == user.Id).Count();
            }
            return resultUsers;
        }

        public async Task<PkddUserInfo> GetAsync(int id)
        {
            PkddUser user = await users.FindAsync(id);
            return await ToPkddUserInfoAsync(user);
        }

        public async Task<PkddUserInfo> GetAsync(string email)
        {
            PkddUser user = await users.FindAsync(email);
            return await ToPkddUserInfoAsync(user);
        }

        public async Task UpdateAsync(PkddUserInfo userInfo)
        {
            // TODO: handle roles changes. Handle fields changes
            return;
        }

        public async Task<List<PkddUserInfo>> ToPkddUsersInfoAsync(List<PkddUser> users)
        {
            List<Task<PkddUserInfo>> infos = new List<Task<PkddUserInfo>>();
            foreach (PkddUser user in users)
            {
                infos.Add(ToPkddUserInfoAsync(user));
            }
            await Task.WhenAll(infos.ToArray());
            return infos.Select(i => i.Result).ToList();
        }

        public async Task<PkddUserInfo> ToPkddUserInfoAsync(PkddUser user)
        {
            PkddUserInfo userInfo = new PkddUserInfo()
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                IsBanned = user.IsBanned,
                IsConfirmed = user.IsConfirmed,
                IsDeleted = user.IsDeleted,
                IsBaseUser = user.IsBaseUser,
            };
            userInfo.Roles = (await users.GetRolesAsync(user)).ToList();
            return userInfo;
        }
    }
}
