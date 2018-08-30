using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Pkdd.Models.Person;
using Pkdd.Models.Users;
using Pkdd.Models.Users.Roles;

namespace Pkdd.Database
{
    public class PkddDbContext : IdentityDbContext<PkddUser, PkddRoleBase, int>
    {
        public PkddDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Person> Persons { get; set; }

        public DbSet<ContentBlock> ContentBlocks { get; set; }

        public DbSet<MetaInformation> MetaInfos { get; set; }

        public DbSet<BaseBioBlock> MainBioBlocks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<PkddRoleAdmin>();
            builder.Entity<PkddRoleExpert>();
            builder.Entity<PkddRoleTech>();
            builder.Entity<Person>();
            builder.Entity<ContentBlock>();
            builder.Entity<MetaInformation>();
            base.OnModelCreating(builder);
        }
    }
}
