using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Data
{
    public class XToolEntityStorage : EntityStorage<int>
    {
        public XToolEntityStorage(XToolDBContext context) : base(context)
        {
        }

        public override int AddItem<T>(T item)
        {
            return base.AddItem(item);
        }

    }
}
