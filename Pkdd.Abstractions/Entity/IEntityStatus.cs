using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions.Entity
{
    public interface IEntityStatus
    {
        bool IsDeleted { get; set; }

        void MarkCreated();

        void MarkDeleted();

        void MarkUpdated();
    }
}
