using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.ModelInterfaces
{
    public interface IStorageModel<TKey> : ISearchable, IUpdateble, IWithId<TKey>
    {
    }
}
