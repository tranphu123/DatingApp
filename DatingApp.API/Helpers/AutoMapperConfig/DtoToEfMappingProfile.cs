using DatingApp.API.Dtos;
using DatingApp.API.Models;
using AutoMapper;


namespace DatingApp.API.Helpers.AutoMapper
{
    public class DtoToEfMappingProfile : Profile
    {
        public DtoToEfMappingProfile()
        {
            CreateMap<LocationDto, Location>();
            CreateMap<PoDto,Po>();
            CreateMap<OrderPartDto,Order_Part>();
          
        }
    }
}