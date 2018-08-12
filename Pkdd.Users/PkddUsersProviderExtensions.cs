using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Users
{
    public static class PkddUsersProviderExtensions
    {
        /// <summary>
        /// To use PkddUsersServices you have to add identity and database context services before this one.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddPkddUsers(this IServiceCollection services)
        {
            services.AddTransient<IPkddUserManager, PkddUserManager>();
            services.AddTransient<IPkddAuthManager, PkddAuthManager>();
            return services;
        }
    }
}
