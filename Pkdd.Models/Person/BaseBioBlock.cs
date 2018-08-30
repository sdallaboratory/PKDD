using Pkdd.Abstractions.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Models.Person
{
    public class BaseBioBlock : EntityBase<BaseBioBlock>
    {
        public int PersonId { get; set; }
        public Person Person { get; set; }

        public List<ContentBlock> ContentBlocks { get; set; }

        public override BaseBioBlock Update(BaseBioBlock entity)
        {
            throw new NotImplementedException();
        }
    }
}
