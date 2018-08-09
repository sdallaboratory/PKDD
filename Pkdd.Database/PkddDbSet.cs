using Microsoft.EntityFrameworkCore;
using Pkdd.Abstractions.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Database
{
    public class PkddDbSet<TEntity> : DbSet<TEntity> where TEntity : class, IEntity
    {
    }
}
