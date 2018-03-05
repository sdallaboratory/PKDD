using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.Storage;

namespace XTool.Data
{
    public static class IStorageServiceProviderExtension
    {
        public static IServiceCollection AddStorage(this IServiceCollection service)
        {
            // Добавить потом вызов этого метода как дженерик, с подбором замещающего типа с помощью рефлексии
            return service.AddTransient(typeof(IStorage<int>), typeof(XToolEntityStorage));
        }
    }
}
