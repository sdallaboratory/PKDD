using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Pkdd.Models.Users;

namespace Pkdd.Users
{
    class PkddAuthManager : IPkddAuthManager
    {
        private readonly UserManager<PkddUser> _userManager;
        private readonly SignInManager<PkddUser> _signInManager;

        public PkddAuthManager(UserManager<PkddUser> userManager, SignInManager<PkddUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        /// <summary>
        /// Make the user authorized and return <see cref="PkddUser"/> object of authorized user or throws an exception.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <param name="remember"></param>
        /// <returns></returns>
        public async Task<PkddUser> SignInAsync(string email, string password, bool remember)
        {
            PkddUser user = await _userManager.FindByEmailAsync(email);

            await _signInManager.PasswordSignInAsync(user, password, remember, false);

            return user;
        }

        /// <summary>
        /// Makes current user unauthorized or throws an exception.
        /// </summary>
        /// <returns></returns>
        public async Task SignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
