using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Users
{
    public static class PkddUsersProviderExtensions
    {
        public static IServiceCollection AddPkddUsers(this IServiceCollection services)
        {
            services.AddTransient<IPkddUserManager, PkddUserManager>();
            services.AddTransient<IPkddSignInManager, PkddSignInManager>();
            return services;
        }
    }
}
