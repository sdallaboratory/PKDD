﻿using Microsoft.AspNetCore.Identity;
using Pkdd.Abstractions;
using Pkdd.Abstractions.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pkdd.Models.Users.Roles
{
    public abstract class PkddRoleBase : IdentityRole<int>, IEntity
    {
        public PkddRoleBase(string roleName) : base(roleName)
        {
        }

        [NotMapped]
        public abstract PkddRoles EnumValue { get; }

        public TimeTrack TimeTrack { get; set; }

        public bool IsDeleted { get; set; }
    }
}
