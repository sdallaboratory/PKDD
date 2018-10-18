using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions.Entity
{
    public interface IUpdatable<TEntity>
    {
        // Should return current object (this) after it was updated
        TEntity Update(TEntity entity);
    }
}
