using Microsoft.AspNetCore.Identity;
using Pkdd.Abstractions;
using Pkdd.Abstractions.Entity;
using System;

namespace Pkdd.Models.Users
{
    public class PkddUser : IdentityUser<int>, IEntity<PkddUser>
    {
        public string Name { get; set; }

        public bool IsConfirmed { get; set; }

        public bool IsBanned { get; set; }

        public TimeTrack TimeTrack { get; set; } = new TimeTrack();

        public bool IsDeleted { get; set; }

        public string FullName { get; set; }

        public DateTime Birthdate { get; set; }

        public void FillUserName()
        {
            UserName = Email + DateTime.Now.Millisecond;
        }

        public PkddUser Update(PkddUser entity)
        {
            Name = entity.Name;
            IsConfirmed = entity.IsConfirmed;
            IsBanned = entity.IsBanned;
            IsDeleted = entity.IsDeleted;
            return this;
        }
    }
}
