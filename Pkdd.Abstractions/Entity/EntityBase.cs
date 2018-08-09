using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions.Entity
{
    public abstract class EntityBase : IEntity
    {
        public EntityBase()
        {
            this.Init();
        }

        public virtual int Id { get; set; }

        public virtual TimeTrack TimeTrack { get; set; }

        public virtual bool IsDeleted { get; set; }
    }
}
