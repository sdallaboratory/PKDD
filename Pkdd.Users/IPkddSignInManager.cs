﻿using Pkdd.Models.Users;
using System.Threading.Tasks;

namespace Pkdd.Users
{
    public interface IPkddSignInManager
    {
        Task<PkddUser> SignInAsync(string email, string password);

        Task SignOutAsync();
    }
}
