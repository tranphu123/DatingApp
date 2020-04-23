using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DatingApp.API._Repositories.Interface;
using DatingApp.API._Services.Interface;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API._Services.Services
{
    public class PoService : IPoService
    {
        private readonly IPoRepository _repoPo;

        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public PoService(IPoRepository repoPo, IMapper mapper, MapperConfiguration configMapper)
        {
            _repoPo = repoPo;
            _configMapper = configMapper;
            _mapper = mapper;
           
        }
        public async Task<bool> Add(PoDto Model)
        {

            var po = _mapper.Map<Po>(Model);
            _repoPo.Add(po);
            return await _repoPo.SaveAll();
        }

        public async Task<bool> Delete(object id)
        {
          var po = _repoPo.FindById(id);
          _repoPo.Remove(po);
          return await _repoPo.SaveAll();
        }

        public async Task<List<PoDto>> GetAllAsync()
        {
           return await _repoPo.FindAll().ProjectTo<PoDto>(_configMapper)
           .OrderByDescending(x => x.ID).ToListAsync();
        }

        public PoDto GetByID(object id)
        {
            return _mapper.Map<Po,PoDto>(_repoPo.FindById(id));
        }

        public async Task<PagedList<PoDto>> GetwithPaginations(PaginationParams param)
        {
            var lists = _repoPo.FindAll().ProjectTo<PoDto>(_configMapper).OrderByDescending(x=>x.ID);
            return await PagedList<PoDto>.CreateAsync(lists,param.PageNumber,param.PageSize);
        }

        public async Task<PagedList<PoDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoPo.FindAll().ProjectTo<PoDto>(_configMapper).OrderByDescending(x=>x.ID)
            .Where(x=> x.Model.Contains(text.ToString())|| x.Model_Name.Contains(text.ToString())||x.No_Line.Contains(text.ToString())
            || x.PO_No.Contains(text.ToString()));
            return await PagedList<PoDto>.CreateAsync(lists,param.PageNumber,param.PageSize);
        }

        public async Task<bool> Update(PoDto Model)
        {
            var po =_mapper.Map<Po>(Model);
            _repoPo.Upadate(po);
            return await _repoPo.SaveAll();
        }
    }
}