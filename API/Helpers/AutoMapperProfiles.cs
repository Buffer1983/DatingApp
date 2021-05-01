using System;
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
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src => 
                    src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src => 
                    src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<FuelExpense,FuelExpenseDto>()
                    .ForMember(dest => dest.TripOutside, opt => opt.MapFrom(src => src.TripOutside.ToString()))
                    .ForMember(dest => dest.ScheduledTrip, opt => opt.MapFrom(src => src.ScheduledTrip.ToString()))
                    .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.UserName.ToString()));
            CreateMap<FuelExpenseDto,FuelExpense>()
                    .ForMember(dest => dest.TripOutside, opt => opt.MapFrom(src => bool.Parse(src.TripOutside.ToString())))
                    .ForMember(dest => dest.ScheduledTrip, opt => opt.MapFrom(src =>bool.Parse(src.ScheduledTrip.ToString())));
                    // .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.Username));
                
        }
    }
}
            