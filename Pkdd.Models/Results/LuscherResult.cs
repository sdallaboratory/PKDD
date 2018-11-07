using Microsoft.EntityFrameworkCore;
using Pkdd.Abstractions.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Models.Results
{
    [Owned]
    public class LuscherResult : IUpdatable<LuscherResult>
    {
        public LuscherResult Update(LuscherResult source)
        {
            return this;
        }
    }
}
