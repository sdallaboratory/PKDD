using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.DB;
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
            this.Init();
        }


        public DbSet<Actor> Actors { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Publication> Publications { get; set; }

        public DbSet<Video> Videos { get; set; }

        public DbSet<BiographyEvent> BiographyEvents { get; set; }

        public DbSet<CareerPeriod> CareerPeriods { get; set; }

        public DbSet<CareerEvent> CareerEvents { get; set; }

        public DbSet<CustomSection> CustomSections { get; set; }

        public DbSet<Evaluation> Evaluations { get; set; }

        public DbSet<UploadedPhoto> UploadedPhotos { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AdminRole>();
            builder.Entity<ExpertRole>();
            builder.Entity<TechnologistRole>();
            base.OnModelCreating(builder);
        }
    }
}
