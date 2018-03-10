using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.TransferModels
{
    public class UserRegisterModel : IUpdateble
    {
        public string  Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string PasswordRepeat { get; set; }

        public IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
