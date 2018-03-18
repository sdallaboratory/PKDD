using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Data.ModelInterfaces
{
    public interface IUpdateble
    {
        IUpdateble Update(IUpdateble model);
    }
}
