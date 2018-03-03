using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models
{
    public interface IModel
    {
        IModel Update(IModel model);
    }
}
