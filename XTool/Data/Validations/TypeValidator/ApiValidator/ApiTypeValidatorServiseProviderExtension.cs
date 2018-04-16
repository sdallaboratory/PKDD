using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace XTool.Data.Validations.ApiValidator

{
    public static class ApiTypeValidatorServiseProviderExtension
    {
        public static IServiceCollection AddApiTypesValidator(this IServiceCollection services)
        {
            return services.AddTransient<ITypeValidator, ApiTypeValidator>();
        }
    }
}
