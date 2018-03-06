using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models
{
    public static class Handler
    {
        public static string HashPassword<TUser>(TUser user, string password) where TUser : class => 
            new PasswordHasher<TUser>().HashPassword(user, password);
    }
}
