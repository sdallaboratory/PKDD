using Microsoft.AspNetCore.Identity;
using Pkdd.Abstractions;
using Pkdd.Abstractions.Entity;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pkdd.Models.Users
{
    public class PkddUser : IdentityUser<int>, IEntity<PkddUser>
    {
        public string Name { get; set; }

        public bool IsConfirmed { get; set; }

        public bool IsBanned { get; set; }

        public TimeTrack TimeTrack { get; set; } = new TimeTrack();

        public bool IsDeleted { get; set; }

        public bool IsBaseUser { get; set; }

        // TODO: Remove duplicated property
        public string FullName { get; set; }
        
        public DateTime Birthdate { get; set; }

        public void FillUserName()
        {
            UserName = Email;
        }

        public PkddUser Update(PkddUser source)
        {
            Name = source.Name;
            IsConfirmed = source.IsConfirmed;
            IsBanned = source.IsBanned;
            IsDeleted = source.IsDeleted;
            TimeTrack = source.TimeTrack;
            Birthdate = source.Birthdate;
            return this;
        }
    }
}
