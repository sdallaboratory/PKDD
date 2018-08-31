﻿using System;
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
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                throw new Exception("Введены некорректные данные.");

            PkddUser user = await _userManager.FindByEmailAsync(email)
                ?? throw new Exception("Пользователя с таким Email нет в системе.");

            var result = await _signInManager.PasswordSignInAsync(user, password, remember, false);

            if(!result.Succeeded)
                throw new Exception("Введён неверный пароль.");
            
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
