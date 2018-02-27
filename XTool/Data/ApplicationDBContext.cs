using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models.Roles;

namespace XTool.Data
{
    public class ApplicationDBContext : IdentityDbContext<XToolUser, XToolRole, int>
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
        }
    }
}
