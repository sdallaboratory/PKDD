﻿using Pkdd.Models.Users;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pkdd.Users
{
    public interface IPkddUserRepository
    {
        Task<List<PkddUserInfo>> GetAllAsync();

        Task<PkddUserInfo> GetAsync(int id);

        Task UpdateAsync(PkddUserInfo userInfo);

    }
}
