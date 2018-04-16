using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.ModelInterfaces;

namespace XTool.Models.Roles
{
    public class ExpertRole : XToolRole, IStorageModel<int>
    {
        public ExpertRole() : this("expert")
        {
        }

        public ExpertRole(string name) : base(name)
        {
        }

        public new IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
