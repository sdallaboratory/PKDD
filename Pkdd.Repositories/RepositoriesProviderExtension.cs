using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Repositories
{
    public static class RepositoriesProviderExtension
    {
        public static IServiceCollection AddPersonRepository(this IServiceCollection services)
        {
            services.AddTransient<IPersonRepository, PersonRepository>();
            return services;
        }

        public static IServiceCollection AddResultRepository(this IServiceCollection services)
        {
            services.AddTransient<IResultRepository, ResultRepository>();
            return services;
        }

        public static IServiceCollection AddFeedbackRepository(this IServiceCollection services)
        {
            services.AddTransient<IFeedbackRepository, FeedbackRepository>();
            return services;
        }
    }
}
