using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions.Entity
{
    public abstract class EntityBase<TEntity> : IEntity<TEntity>
    {
        public EntityBase()
        {
            MarkCreated();
        }

        public virtual int Id { get; set; }

        public virtual TimeTrack TimeTrack { get; set; }

        public virtual bool IsDeleted { get; set; }

        public abstract TEntity Update(TEntity entity); 

        public virtual void MarkDeleted()
        {
            if (!IsDeleted)
            {
                IsDeleted = true;
                TimeTrack.Deleted = DateTime.Now;
            }
        }

        public virtual void  MarkCreated()
        {
            TimeTrack = new TimeTrack
            {
                Created = DateTime.Now
            };
        }

        public virtual void MarkUpdated()
        {
            TimeTrack = new TimeTrack
            {
                Updated = DateTime.Now
            };
        }
    }
}
