using System;
using System.Threading.Tasks;
using DatingApp.API._Services.Interface;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService  _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }
        [HttpGet(Name ="GetLocation")]
        public async Task<IActionResult> GetLocation([FromQuery]PaginationParams param)
        {
            var location = await _locationService.GetwithPaginations(param);
            Response.AddPagination(location.CurrentPage,location.PageSize,location.TotalCount,location.TotalPages);
            return Ok(location);
        }
        [HttpGet("all",Name ="GetAllLocation")]
        public async Task<IActionResult> GetAll()
        {
            var location = await _locationService.GetAllAsync();
            return Ok(location);
        }
        [HttpGet("search/{text}",Name ="SearchLocation")]
        public async Task<IActionResult> Search([FromQuery]PaginationParams param,string text)
        {
            var lists =await _locationService.Search(param,text);
            Response.AddPagination(lists.CurrentPage,lists.PageSize,lists.TotalCount,lists.TotalPages);
            return Ok(lists);
        }
        [HttpPost]
        public async Task<IActionResult> CreateLocation(LocationDto locationDto)
        {
            if(await _locationService.Add(locationDto))
            {
                return CreatedAtRoute("GetLocation",new {});
            }
            throw new Exception("Create the location failed on save");
        }
        [HttpPut]
        public async Task<IActionResult> UpdateLocation(LocationDto locationDto)
        {
            if(await _locationService.Update(locationDto))  
                return NoContent();
            return BadRequest($"Updating Location {locationDto.Location_ID} Failed on save");
            
        }
        public async Task<IActionResult> Delete(int id)
        {
            if(await _locationService.Delete(id))
            return NoContent();
            throw new Exception("Error deleting the Location");
        }
    }
}