using Pkdd.Models.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Models.Common
{
    public class RolesRequest
    {
        public string Role { get; set; }

        public RolesActions Action { get; set; }
    }
}
