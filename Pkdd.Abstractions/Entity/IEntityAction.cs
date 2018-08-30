using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions.Entity
{
    public interface IEntityAction<TEntity>
    {
        TEntity Update(TEntity entity);
    }
}
