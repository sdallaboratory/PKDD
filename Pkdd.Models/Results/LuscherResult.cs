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

        public double Grey { get; set; }
        public double Pink { get; set; }
        public double Black { get; set; }
        public double Yellow { get; set; }
        public double Green { get; set; }
        public double Blue { get; set; }
        public double Red { get; set; }
        public double Brown { get; set; }

        public LuscherResult Update(LuscherResult source)
        {
            Grey = source.Grey;
            Pink = source.Pink;
            Black = source.Black;
            Yellow = source.Yellow;
            Green = source.Green;
            Blue = source.Blue;
            Red = source.Red;
            Brown = source.Brown;
            return this;
        }
    }
}
