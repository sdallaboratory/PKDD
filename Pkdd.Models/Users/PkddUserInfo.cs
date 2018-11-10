using Pkdd.Models.Users;
using System.Collections.Generic;

namespace Pkdd.Models.Users
{
    public class PkddUserInfo
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public bool IsConfirmed { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsBanned { get; set; }

        public bool IsBaseUser { get; set; }

        public List<string> Roles { get; set; }
    }
    
}