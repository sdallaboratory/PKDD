using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions.Entity
{
    [JsonObject]
    public abstract class EntityBase<TEntity> : IEntity<TEntity>
    {
        public EntityBase()
        {
            MarkCreated();
        }

        [JsonProperty("id")]
        public virtual int Id { get; set; }

        [JsonProperty("timeTrack")]
        public virtual TimeTrack TimeTrack { get; set; }

        [JsonProperty("isDeleted")]
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
