using System;
using System.Collections.Generic;
using System.Text;

namespace XTool.Data.Validations
{
    public interface ITypeValidator
    {
        List<Type> ServiceTypes { get; }

        bool IsInService(Type type);

        Type IsInService(string typeName);
    }
}
