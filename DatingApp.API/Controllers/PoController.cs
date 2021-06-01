using System;
using System.Threading.Tasks;
using DatingApp.API._Services.Interface;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.HubConfig;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PoController: ControllerBase
    {
        private readonly IPoService _poService;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;

        public PoController(IPoService poService,
        IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _poService = poService;
            _hubContext = hubContext;
        }
        [HttpGet(Name ="GetPo")]
        public async Task<IActionResult> GetPo([FromQuery]PaginationParams param)
        {
            var po =await  _poService.GetwithPaginations(param);
           Response.AddPagination(po.CurrentPage,po.PageSize,po.TotalCount,po.TotalPages);
            return Ok(po);
        }

        [HttpGet("all", Name="GetAllPo")]
        public async Task<IActionResult> GetAllPo()
        {
            var po = await _poService.GetAllAsync();
            return Ok(po);
        }

        [HttpGet("Search/{text}",Name ="Search")]
        public async Task<IActionResult> Search([FromQuery]PaginationParams param,string text)
        {
            var po = await _poService.Search(param,text);
            Response.AddPagination(po.CurrentPage,po.PageSize,po.TotalCount,po.TotalPages);
            return Ok(po);
        }
        [HttpPost]
        public async Task<IActionResult> CreatePo(PoDto poDto)
        {
            if(await _poService.Add(poDto))
            {
                await _hubContext.Clients.All.loadPo();
                return CreatedAtRoute("GetAllPo",new {});
            }
            throw new Exception("create Po failer on save");
        }
        [HttpPut]
        public async Task<IActionResult> UpdatePo(PoDto poDto)
        {
            if(await _poService.Update(poDto))
            {
                await _hubContext.Clients.All.loadPo();
                 return NoContent();
            }
            return BadRequest($"Updating Po {poDto.ID} failer on save" );
            
        }
        [HttpDelete]
        public async Task<IActionResult> DeletePo(int id)
        {
            if(await _poService.Delete(id))
            {
            await _hubContext.Clients.All.loadPo();
            return NoContent();
            }

            throw new Exception("Error Deleting Po Failer");
        }
    }
}