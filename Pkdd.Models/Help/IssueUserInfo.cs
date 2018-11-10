using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Models.Help
{
    [Owned]
    public class IssueUserInfo
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string MainRole { get; set; }
    }
}
