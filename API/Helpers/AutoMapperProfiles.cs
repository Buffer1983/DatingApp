using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //Create Map between AppUser and MemberDto. For PhotoUrl of MemberDto, the options is to map with Url that comes as result of
            //firstordefault from Photos that is Main is true.
            //Also we special map the Age. We tell him to map it with the return of method CalculateAge()
            CreateMap<AppUser,MemberDto>()
            .ForMember(dest => dest.PhotoUrl,opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(sourceMember=>sourceMember.DateOfBirth.CalculateAge()));
            CreateMap<Photo,PhotoDto>();
            CreateMap<MemberUpdateDto,AppUser>();
            CreateMap<RegisterDto,AppUser>();
        }
    }
}