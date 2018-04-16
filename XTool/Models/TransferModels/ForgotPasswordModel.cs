using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.ModelInterfaces;

namespace XTool.Models.TransferModels
{
    public class ForgotPasswordModel
    {
        public string Email { get; set; }

        public string Name { get; set; }

        public DateTime Birtday { get; set; }

        public string Phone { get; set; }
    }
}
