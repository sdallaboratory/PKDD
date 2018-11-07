using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions.Entity
{
    public interface IUpdatable<T>
    {
        // Should return current object (this) after it was updated
        T Update(T source);
    }
}
