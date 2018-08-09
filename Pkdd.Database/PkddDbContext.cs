using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Pkdd.Models.Users;
using Pkdd.Models.Users.Roles;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Database
{
    public class PkddDbContext : IdentityDbContext<PkddUser, PkddRoleBase, int>
    {
        public PkddDbContext(DbContextOptions options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<PkddRoleAdmin>();
            builder.Entity<PkddRoleExpert>();
            builder.Entity<PkddRoleTech>();
            base.OnModelCreating(builder);
        }
    }
}
