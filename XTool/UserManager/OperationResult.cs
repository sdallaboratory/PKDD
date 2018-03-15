using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models.Roles;

namespace XTool.UserManager
{
    public class OperationResult
    {
        public Statuses Status { get; set; }

        public string Message { get; set; }

        public XToolUser User { get; set; }
    }
}
