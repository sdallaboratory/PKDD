using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace XTool.Data.Validations.ApiValidator

{
    public class ApiTypesValidator : IValidator
    {
        private DbContext _context;

        public ApiTypesValidator(XToolDBContext context)
        {
            _context = context;
        }

        public List<Type> ServiceTypes => FindSets();

        public bool IsInService(Type type)
        {
            return _context.Model.FindEntityType(type) != null ? true : false;
        }

        public bool IsInService(string typeName)
        {

            return ServiceTypes.FirstOrDefault((x) => ProcessTypeName(x.Name.ToLower()) == typeName.ToLower()) != null ? true : false;
        }

        private List<Type> FindSets()
        {
            return _context.GetType().GetProperties().ToList().ConvertAll((x) => x.PropertyType.GetGenericArguments().FirstOrDefault());
        }

        private string ProcessTypeName(string typeName)
        {
            return new string(typeName.TakeWhile(x => Regex.IsMatch(x.ToString(), @"[a-z]")).ToArray());
        }
    }
}
    