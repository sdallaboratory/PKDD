using Microsoft.EntityFrameworkCore;
using Pkdd.Abstractions.Entity;

namespace Pkdd.Models.Results
{
    [Owned]
    public class PhysiognomyResult : IUpdatable<PhysiognomyResult>
    {
        public double Group1 { get; set; }

        public double Group2 { get; set; }

        public double Group3 { get; set; }

        public double Group4 { get; set; }

        public double Group5 { get; set; }

        public double Group6 { get; set; }

        public double Group7 { get; set; }

        public double Group8 { get; set; }

        public double Group9 { get; set; }

        public double Group10 { get; set; }

        public double Group11 { get; set; }

        public double Group12 { get; set; }

        public PhysiognomyResult Update(PhysiognomyResult source)
        {
            Group1 = source.Group1;
            Group2 = source.Group2;
            Group3 = source.Group3;
            Group4 = source.Group4;
            Group5 = source.Group5;
            Group6 = source.Group6;
            Group7 = source.Group7;
            Group8 = source.Group8;
            Group9 = source.Group9;
            Group10 = source.Group10;
            Group11 = source.Group11;
            Group12 = source.Group12;
            return this;
        }
    }
}
