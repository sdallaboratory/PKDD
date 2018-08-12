using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Models.Diagnostics
{
    public class HealthCheckInfo
    {
        public HealthCheckInfo(string statusMessage = "Ok")
        {
            StatusMessage = statusMessage;
        }

        public string StatusMessage { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;
    }
}
