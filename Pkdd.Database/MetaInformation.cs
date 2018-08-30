using Pkdd.Abstractions.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Database
{
    public class MetaInformation: EntityBase<MetaInformation>
    {
        public int Id { get; set; }

        public int Version { get; set; }

        public override MetaInformation Update(MetaInformation entity)
        {
            throw new NotImplementedException();
        }
    }
}
