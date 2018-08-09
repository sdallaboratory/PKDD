﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Abstractions
{
    public class TimeTrack
    {
        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }

        public DateTime Deleted { get; set; }
    }
}
