using System;
using System.Collections.Generic;
using System.Text;

namespace XTool.Data.Validations
{
    public interface IValidator
    {
        List<Type> ServiceTypes { get; }

        bool IsInService(Type type);

        bool IsInService(string typeName);
    }
}
