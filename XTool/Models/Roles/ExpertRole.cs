using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.Roles
{
    public class ExpertRole : XToolRole, IUpdateble
    {
        public ExpertRole(string name = "expert") : base(name)
        {

        }

        public IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
