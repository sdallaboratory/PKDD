using Microsoft.EntityFrameworkCore;
using Pkdd.Abstractions.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Models.Results
{
    [Owned]
    public class PhysiognomyResult : IUpdatable<PhysiognomyResult>
    {
        public PhysiognomyResult Update(PhysiognomyResult source)
        {
            return this;
        }
    }
}
