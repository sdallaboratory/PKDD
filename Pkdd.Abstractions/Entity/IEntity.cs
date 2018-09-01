﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions.Entity
{
    public interface IEntity<TEntity> : IEntityStatus, IEntityAction<TEntity>
    {
        int Id { get; set; }
    }
}
