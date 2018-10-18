using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions.Entity
{
    public abstract class EntityBase<TEntity> : IEntity<TEntity>
    {
        public int Id { get; set; }

        public TimeTrack TimeTrack { get; set; } = new TimeTrack();

        public bool IsDeleted { get; set; }

        public abstract TEntity Update(TEntity entity);
    }
}
