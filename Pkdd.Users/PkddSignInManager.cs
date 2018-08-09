using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pkdd.Models.Users;

namespace Pkdd.Users
{
    class PkddSignInManager : IPkddSignInManager
    {
        public Task<PkddUser> SignInAsync(string email, string password)
        {
            throw new NotImplementedException();
        }

        public Task SignOutAsync()
        {
            throw new NotImplementedException();
        }
    }
}
