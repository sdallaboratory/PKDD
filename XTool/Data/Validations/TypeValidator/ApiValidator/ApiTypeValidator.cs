using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace XTool.Data.Validations.ApiValidator

{
    public class ApiTypeValidator : ITypeValidator
    {
        private DbContext _context;

        public ApiTypeValidator(XToolDbContext context)
        {
            _context = context;
        }

        public List<Type> ServiceTypes => FindSets();

        public bool IsInService(Type type)
        {
            return _context.Model.FindEntityType(type) != null ? true : false;
        }

        public Type IsInService(string typeName)
        {
            //Needs to cache the result
            return ServiceTypes.FirstOrDefault((x) => ProcessTypeName(x.Name.ToLower()) == typeName.ToLower());
        }

        private List<Type> FindSets()
        {
            return _context.Model.GetEntityTypes().ToList().ConvertAll(x => x.ClrType);//.GetType().GetProperties().ToList().ConvertAll((x) => x.PropertyType.GetGenericArguments().FirstOrDefault());
        }

        private string ProcessTypeName(string typeName)
        {
            return new string(typeName.TakeWhile(x => Regex.IsMatch(x.ToString(), @"[a-z]")).ToArray());
        }
    }
}
    