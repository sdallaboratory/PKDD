using Pkdd.Models.Users;
using System.Threading.Tasks;

namespace Pkdd.Users
{
    public interface IPkddAuthManager
    {
        Task<PkddUser> SignInAsync(string email, string password, bool remember);

        Task SignOutAsync();
    }
}
