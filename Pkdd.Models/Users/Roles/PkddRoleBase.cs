using Microsoft.AspNetCore.Identity;
using Pkdd.Abstractions;
using Pkdd.Abstractions.Entity;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pkdd.Models.Users.Roles
{
    public abstract class PkddRoleBase : IdentityRole<int>, IEntity<PkddRoleBase>
    {
        public PkddRoleBase(string roleName) : base(roleName)
        {
            MarkCreated();
        }

        [NotMapped]
        public abstract PkddRoles EnumValue { get; }

        public TimeTrack TimeTrack { get; set; }

        public bool IsDeleted { get; set; }

        public PkddRoleBase Update(PkddRoleBase entity)
        {
            IsDeleted = entity.IsDeleted;
            return this;
        }

        public void MarkDeleted()
        {
            if (!IsDeleted)
            {
                IsDeleted = true;
                TimeTrack.Deleted = DateTime.Now;
            }
        }

        public void MarkCreated()
        {
            TimeTrack = new TimeTrack
            {
                Created = DateTime.Now
            };
        }

        public void MarkUpdated()
        {
            TimeTrack = new TimeTrack
            {
                Updated = DateTime.Now
            };
        }
    }
}
