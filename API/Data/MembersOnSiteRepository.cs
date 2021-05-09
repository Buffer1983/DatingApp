using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MembersOnSiteRepository : IMemberOnSiteRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MembersOnSiteRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<MemberOnSiteDto>> GetMembersOnSiteThread()
        {
            var  membersOnSite = await _context.MembersOnSite
                    .OrderBy(m=>m.LastAccessTime)
                    .ProjectTo<MemberOnSiteDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
            return membersOnSite;
        }
    }
}