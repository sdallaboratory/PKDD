using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Models.Users
{
    public class UserCreateInfo: PkddUserInfo
    {
        public string Password { get; set; }
    }
}
