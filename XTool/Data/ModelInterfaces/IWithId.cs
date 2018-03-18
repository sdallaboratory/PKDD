using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.ModelInterfaces
{
    public interface IWithId<TKey>
    {
        TKey Id { get; set; }
    }
}
