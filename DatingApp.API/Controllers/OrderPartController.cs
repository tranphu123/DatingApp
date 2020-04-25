using System;
using System.Threading.Tasks;
using DatingApp.API._Services.Interface;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrderPartController : ControllerBase
    {
        private readonly IOrderPartService _orderPartService;

        public OrderPartController(IOrderPartService orderPartService)
        {
            _orderPartService = orderPartService;

        }
        [HttpGet(Name = "GetOrderPart")]
        public async Task<IActionResult> GetOrderPart([FromQuery]PaginationParams param)
        {
            var orderPart = await _orderPartService.GetwithPaginations(param);
            Response.AddPagination(orderPart.CurrentPage, orderPart.PageSize, orderPart.TotalCount, orderPart.TotalPages);
            return Ok(orderPart);
        }
        [HttpGet("all",Name="GetAllOrderPart")]
        public async Task<IActionResult> GetAllOrderPart()
        {
            var orderPart = await _orderPartService.GetAllAsync();
            return Ok(orderPart);
        }
        [HttpGet ("search/{text}",Name ="SearchOderPart")]
        public async Task<IActionResult> SearchOderPart([FromQuery]PaginationParams param,string text)
        {
            var orderPart =await _orderPartService.Search(param,text);
            Response.AddPagination(orderPart.CurrentPage,orderPart.PageSize,orderPart.TotalCount,orderPart.TotalPages);
            return Ok(orderPart);
        }
        [HttpPost (Name="CreateOrderPart")]
        public async Task<IActionResult> CreateOrderPart(OrderPartDto  orderPartdto)
        {
            if(await _orderPartService.Add(orderPartdto))
            {
                CreatedAtRoute("GetOrderPart",new {});
            }
            throw new Exception("Create OrderPart Failer on save");
        }
        [HttpPut(Name ="UpdateOrderPart")]
        public async Task<IActionResult> UpdateOrderPart(OrderPartDto orderPartDto)
        {
            if(await _orderPartService.Update(orderPartDto))
            return NoContent();
            throw new Exception($"Updating OrderPart {orderPartDto.ID} Failer on save");
        }

        [HttpDelete (Name ="DeleteOrderPart")]
        public async Task<IActionResult> DeleteOrderPart(int id)
        {
            if(await _orderPartService.Delete(id))
            return NoContent();
            throw new Exception("Deleting OrderPart Failer");
        }
    }
}