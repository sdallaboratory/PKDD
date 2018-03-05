using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models;
using XTool.Models.ActorModels;
using XTool.Models.ActorModels.BaseTypes;
using XTool.Models.EvaluationModels;
using XTool.Models.Roles;

namespace XTool.Data
{
    public class XToolDBContext : IdentityDbContext<XToolUser, XToolRole, int>
    {
        public XToolDBContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Media> Media { get; set; }

        public DbSet<Event> Events { get; set; }

        public DbSet<Actor> Actors { get; set; }
        public DbSet<CareerPeriod> CareerPeriods { get; set; }
        public DbSet<Publication> Publications { get; set; }
        public DbSet<CustomSection> CustomSections { get; set; }

        public DbSet<Evaluation> Evaluations { get; set; }
        public DbSet<Scales> Scales { get; set; }

        public DbSet<UploadedPhoto> UploadedPhotos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AdminRole>();
            builder.Entity<ExpertRole>();
            builder.Entity<TechnologistRole>();

            builder.Entity<BiographyEvent>();
            builder.Entity<CareerEvent>();

            builder.Entity<Photo>().ToTable("Media");
            builder.Entity<Video>().ToTable("Media");
            base.OnModelCreating(builder);
        }
    }
}
