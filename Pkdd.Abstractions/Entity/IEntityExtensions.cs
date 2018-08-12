using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions.Entity
{
    public static class IEntityExtensions
    {
        public static IEntity MarkDeleted(this IEntity entity)
        {
            if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                entity.TimeTrack.Deleted = DateTime.Now;
            }
            return entity;
        }

        public static IEntity Init(this IEntity entity)
        {
            entity.TimeTrack = new TimeTrack();
            entity.TimeTrack.Created = DateTime.Now;
            return entity;
        }
    }
}
