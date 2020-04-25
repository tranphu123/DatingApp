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
    public class OrderPartService : IOrderPartService
    {
        private readonly IOrderPartRepository _repoOrderPart;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public OrderPartService(IOrderPartRepository repoOrderPart, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoOrderPart = repoOrderPart;
        }
        public async Task<bool> Add(OrderPartDto Model)
        {
            var orderPart = _mapper.Map<Order_Part>(Model);
            _repoOrderPart.Add(orderPart);
            return await _repoOrderPart.SaveAll();
        }

        public async Task<bool> Delete(object id)
        {
            var orderPart = _repoOrderPart.FindById(id);
            _repoOrderPart.Remove(orderPart);
            return await _repoOrderPart.SaveAll();
        }

        public async Task<List<OrderPartDto>> GetAllAsync()
        {
            return await _repoOrderPart.FindAll().ProjectTo<OrderPartDto>(_configMapper)
            .OrderByDescending(x => x.ID).ToListAsync();

        }

        public OrderPartDto GetByID(object id)
        {
            return _mapper.Map<Order_Part, OrderPartDto>(_repoOrderPart.FindById(id));
        }

         public async Task<PagedList<OrderPartDto>> GetwithPaginations(PaginationParams param)
        {
            var lists =_repoOrderPart.FindAll().ProjectTo<OrderPartDto>(_configMapper).OrderByDescending(x=> x.ID);
            return await PagedList<OrderPartDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public async Task<PagedList<OrderPartDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoOrderPart.FindAll().ProjectTo<OrderPartDto>(_configMapper).OrderByDescending(x => x.ID)
            .Where(x => x.Model_No.Contains(text.ToString()) ||
             x.Model_Name.Contains(text.ToString()) || x.Part_No.Contains(text.ToString())
             || x.Po_No.Contains(text.ToString()));
            return await PagedList<OrderPartDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        public Task<bool> Update(OrderPartDto Model)
        {
            var orderPart = _mapper.Map<Order_Part>(Model);
            _repoOrderPart.Upadate(orderPart);
            return _repoOrderPart.SaveAll();
        }
    }
}