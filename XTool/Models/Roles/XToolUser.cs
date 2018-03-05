using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models.TransferModels;

namespace XTool.Models.Roles
{
    public class XToolUser : IdentityUser<int>, IUpdateble
    {
        public IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    
        public DateTime Birthday { get; set; }

        public string Position { get; set; }

        public bool WithLogin(LoginModel loginModel)
        {
            return Email == loginModel.Email & PasswordHash == loginModel.Password.GetHashCode().ToString();
        }
    }
}
