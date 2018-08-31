using Microsoft.AspNetCore.Identity;
using Pkdd.Abstractions;
using Pkdd.Abstractions.Entity;
using System;

namespace Pkdd.Models.Users
{
    public class PkddUser : IdentityUser<int>, IEntity
    {
        public string Name { get; set; }

        public bool IsConfirmed { get; set; }

        public bool IsBanned { get; set; }

        public TimeTrack TimeTrack { get; set; } = new TimeTrack();

        public bool IsDeleted { get; set; }

        public void FillUserName()
        {
            UserName = Email + DateTime.Now.Millisecond;
        }
    }
}
