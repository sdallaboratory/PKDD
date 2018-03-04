using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace XTool.Data.Validations.ApiValidator

{
    public static class ApiTypesValidatorServiseProviderExtension
    {
        public static IServiceCollection AddApiTypesValidator(this IServiceCollection services)
        {
            return services.AddTransient<IValidator, ApiTypesValidator>();
        }
    }
}
