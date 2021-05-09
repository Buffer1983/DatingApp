using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface IMemberOnSiteRepository
    {
        Task<IEnumerable<MemberOnSiteDto>> GetMembersOnSiteThread();
    }
}