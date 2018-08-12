using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Models.Auth
{
    public class SignInModel
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public bool Remember { get; set; }
    }
}
