using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Repositories
{
    public static class PersonRepositoryProviderExtension
    {
        public static IServiceCollection AddPersonRepository(this IServiceCollection services)
        {
            services.AddTransient<IPersonRepository, PersonRepository>();
            return services;
        }
    }
}
