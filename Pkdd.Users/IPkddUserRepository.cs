using Pkdd.Models.Users;
using System.Threading.Tasks;

namespace Pkdd.Users
{
    public interface IPkddUserRepository
    {
        Task<PkddUserInfo> GetAsync(int id);

        Task UpdateAsync(PkddUserInfo userInfo);

    }
}
