﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions.Entity
{
    public static class IEntityExtensions
    {
        public static TEntity MarkCreated<TEntity>(this TEntity entity) where TEntity : IEntity<TEntity>
        {
            entity.TimeTrack.Created = DateTime.Now;
            return entity;
        }

        public static TEntity MarkUpdated<TEntity>(this TEntity entity) where TEntity : IEntity<TEntity>
        {
            entity.TimeTrack.Created = DateTime.Now;
            return entity;
        }

        public static TEntity MarkDeleted<TEntity>(this TEntity entity) where TEntity : IEntity<TEntity>
        {
            entity.TimeTrack.Created = DateTime.Now;
            entity.IsDeleted = true;
            return entity;
        }

        public static TEntity MarkRestored<TEntity>(this TEntity entity) where TEntity : IEntity<TEntity>
        {
            entity.TimeTrack.Created = default(DateTime);
            entity.IsDeleted = false;
            return entity;
        }
    }
}
