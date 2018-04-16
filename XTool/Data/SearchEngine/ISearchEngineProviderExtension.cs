using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.ModelInterfaces;
using XTool.Models.ActorModels;

namespace XTool.Data.SearchEngine
{
    public static class ISearchEngineProviderExtension
    {
        public static IServiceCollection AddSearchEngine<TOut, TKey>(this IServiceCollection service) where TOut : class, IStorageModel<TKey>
        {
            // Добавить потом вызов этого метода как дженерик, с подбором замещающего типа с помощью рефлексии
            return service.AddTransient(typeof(ISearchEngine<TOut, TKey>), typeof(ActorsSearchEngine));
        }
    }
}
