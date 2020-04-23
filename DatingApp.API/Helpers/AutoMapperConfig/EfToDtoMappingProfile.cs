using DatingApp.API.Dtos;
using DatingApp.API.Models;
using AutoMapper;

namespace DatingApp.API.Helpers.AutoMapper
{
    public class EfToDtoMappingProfile : Profile
    {
        public EfToDtoMappingProfile()
        {
            CreateMap<Location, LocationDto>();
            CreateMap<Po,PoDto>();
        }
        
    }
}