using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Data
{
    public static class IStorageServiceProviderExtension
    {
        public static IServiceCollection AddStorage(this IServiceCollection service)
        {
            return service.AddTransient(typeof(IStorage<int>), typeof(XToolEntityStorage));
        }
    }
}
