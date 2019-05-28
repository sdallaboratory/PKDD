using Pkdd.Models.Statistics.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pkdd.Statistics
{
    interface IStatisticsService
    {
        Task LogAction(ActionType type);

        Task GetAllActions();
    }
}
