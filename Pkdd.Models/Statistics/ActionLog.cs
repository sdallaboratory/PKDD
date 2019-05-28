using System;
using System.Collections.Generic;
using System.Text;
using Pkdd.Models.Statistics.Enums;
using Pkdd.Models.Users;

namespace Pkdd.Models.Statistics
{
    public class ActionLog
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public PkddUser User { get; set; }
        
        public ActionType Type { get; set; }

        public DateTime Timestamp { get; set; }
    }
}
