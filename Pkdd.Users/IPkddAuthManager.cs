using Pkdd.Models.Users;
using System.Threading.Tasks;

namespace Pkdd.Users
{
    public interface IPkddAuthManager
    {
        /// <summary>
        /// Make the user authorized and return <see cref="PkddUser"/> object of authorized user or throws an exception.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <param name="remember"></param>
        /// <returns></returns>
        Task<PkddUser> SignInAsync(string email, string password, bool remember);

        /// <summary>
        /// Makes current user unauthorized or throws an exception.
        /// </summary>
        /// <returns></returns>
        Task SignOutAsync();
    }
}
