using Pkdd.Abstractions.Entity;
using Pkdd.Models.Persons;
using Pkdd.Models.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Models.Results
{
    public class TestResult : EntityBase<TestResult>
    {
        public int PersonId { get; set; }

        public Person Person { get; set; }

        public int PkddUserId { get; set; }

        public PkddUser PkddUser { get; set; }

        public MmpiResult Mmpi { get; set; } = new MmpiResult();

        public bool MmpiComplete { get; set; }

        public LuscherResult Luscher { get; set; } = new LuscherResult();

        public bool LuscherComplete { get; set; }

        public PhysiognomyResult Physiognomy { get; set; } = new PhysiognomyResult();

        public bool PhysiognomyComplete { get; set; }

        public string Comment { get; set; }

        public override TestResult Update(TestResult entity)
        {
            Mmpi.Update(entity.Mmpi);
            return this;
        }
    }
}
