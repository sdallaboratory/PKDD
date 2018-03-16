using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.DB;

namespace XTool.Data
{
    public class XToolEntityStorage : EntityStorage<int>
    {
        public XToolEntityStorage(XToolDbContext context) : base(context)
        {
            //this.Clear();
            (Context as XToolDbContext).Init();
        }

        public override int Add<T>(T item)
        {
            int result = -1;
            if (item != null)
            {
                var temp = Context.Add(item);
                Context.SaveChanges();
                result = temp.GetDatabaseValues().GetValue<int>("Id");
            }
            return result;
        }

    }
}
