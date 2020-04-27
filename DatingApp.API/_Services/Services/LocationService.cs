
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DatingApp.API._Repositories.Interface;
using DatingApp.API._Services.Interface;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;

namespace DatingApp.API._Services.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _repoLocation;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;

        public LocationService(ILocationRepository repoLocation, IMapper mapper, MapperConfiguration configMapper)
        {
             _configMapper = configMapper;
             _mapper = mapper;
             _repoLocation = repoLocation;

        }

        public async Task<bool> Add(LocationDto Model)
        {
           var location =_mapper.Map<Location>(Model);
           _repoLocation.Add(location);
           return await _repoLocation.SaveAll();   

        }

        public async Task<bool> Delete(object id)
        {
           var location =_repoLocation.FindById(id);
           _repoLocation.Remove(location);
           return await _repoLocation.SaveAll();
        }

       public async Task<List<LocationDto>> GetAllAsync()
        {
           return await _repoLocation.FindAll().ProjectTo<LocationDto>(_configMapper)
           .OrderByDescending(x => x.Location_ID).ToListAsync();

        }

       public LocationDto GetByID(object id)
        {
            return  _mapper.Map<Location, LocationDto>(_repoLocation.FindById(id));
        }

        public async Task<PagedList<LocationDto>> GetwithPaginations(PaginationParams param)
        {
            var lists =_repoLocation.FindAll().ProjectTo<LocationDto>(_configMapper).OrderByDescending(x=> x.Location_ID);
            return await PagedList<LocationDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

       public async Task<PagedList<LocationDto>> Search(PaginationParams param, object text)
        {
           var lists =_repoLocation.FindAll().ProjectTo<LocationDto>(_configMapper)
           .Where(x => x.Location_name.Contains(text.ToString())).OrderByDescending(x => x.Location_ID);
           return await PagedList<LocationDto>.CreateAsync(lists,param.PageNumber,param.PageSize);

        }

        public async Task<bool> Update(LocationDto Model)
        {
            var location = _mapper.Map<Location>(Model);
            _repoLocation.Upadate(location);
            return await _repoLocation.SaveAll();
        }
        public async Task<bool> importExcel(string filePath)
        {
            using(var package =new ExcelPackage(new FileInfo(filePath)))
            {
                 ExcelWorksheet workSheet = package.Workbook.Worksheets[0];
                 LocationDto locationDto =new LocationDto();
                  for (int i = workSheet.Dimension.Start.Row + 1; i <= workSheet.Dimension.End.Row; i++)
                {
                    locationDto.Location_name =workSheet.Cells[i,1].Value.ToString();
                    var location = _mapper.Map<Location>(locationDto);
                    _repoLocation.Add(location);
                }
                 try {
                    await _repoLocation.SaveAll();
                    return true;
                }
                catch (System.Exception)
                {
                    return false;
                    throw;
                } 
            }
        }
    }
}