using Microsoft.EntityFrameworkCore;
using Pkdd.Abstractions.Entity;

namespace Pkdd.Database
{
    public abstract class PkddDbSet<TEntity> : DbSet<TEntity> where TEntity : class, IEntity<TEntity>
    {
        public PkddDbSet(): base()
        {
        }
    }
}
