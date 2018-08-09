﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions.Entity
{
    public interface IEntity
    {
        int Id { get; set; }

        TimeTrack TimeTrack { get; set; }

        bool IsDeleted { get; set; }
    }
}
