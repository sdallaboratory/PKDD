using Microsoft.EntityFrameworkCore;
using Pkdd.Abstractions.Entity;

namespace Pkdd.Database
{
    public class PkddDbSet<TEntity> : DbSet<TEntity> where TEntity : class, IEntity
    {
    }
}
