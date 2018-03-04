using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models.Roles;

namespace XTool.Data
{
    public class XToolDBContext : IdentityDbContext<XToolUser, XToolRole, int>
    {
        public XToolDBContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AdminRole>();
            builder.Entity<ExpertRole>();
            base.OnModelCreating(builder);
        }
    }
}
