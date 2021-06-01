using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using DatingApp.API._Services.Interface;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.HubConfig;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;

        public LocationController(ILocationService locationService,
                                  IWebHostEnvironment webHostEnvironment,
                                  IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _webHostEnvironment = webHostEnvironment;
            _hubContext = hubContext;
            _locationService = locationService;
        }
        [HttpGet(Name = "GetLocation")]
        public async Task<IActionResult> GetLocation([FromQuery]PaginationParams param)
        {
            var location = await _locationService.GetwithPaginations(param);
            Response.AddPagination(location.CurrentPage, location.PageSize, location.TotalCount, location.TotalPages);
            return Ok(location);
        }
        [HttpGet("all", Name = "GetAllLocation")]
        public async Task<IActionResult> GetAll()
        {
            var location = await _locationService.GetAllAsync();
            return Ok(location);
        }
        [HttpGet("search/{text}", Name = "SearchLocation")]
        public async Task<IActionResult> Search([FromQuery]PaginationParams param, string text)
        {
            var lists = await _locationService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }
        [HttpPost]
        public async Task<IActionResult> CreateLocation(LocationDto locationDto)
        {
            if (await _locationService.Add(locationDto))
            {
                 await _hubContext.Clients.All.loadLocation();
                return CreatedAtRoute("GetLocation", new { });
            }
            throw new Exception("Create the location failed on save");
        }
        [HttpPost("importExcel")]
        public async Task<bool> importExcel(IFormFile files)
        {
            if (files != null)
            {
                var file = files;
                var fileName = ContentDispositionHeaderValue
                                .Parse(file.ContentDisposition)
                                .FileName
                                .Trim('"');
                fileName = fileName + "_" + DateTime.Now.ToString().Replace(":", "").Replace("/", "").Replace(" ", "") + ".xlsx";
                string a = _webHostEnvironment.WebRootPath;
                string folder = _webHostEnvironment.WebRootPath + $@"\uploaded\excels";
                 if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                string filePath = Path.Combine(folder, fileName);
                using (FileStream fs = System.IO.File.Create(filePath)) {
                    file.CopyTo(fs);
                    fs.Flush();
                }
                if (await _locationService.importExcel(filePath))
                {
                     await _hubContext.Clients.All.loadLocation();
                    return true;
                } else {
                    return false;
                }
            }
            return false;

        }
        [HttpPut]
        public async Task<IActionResult> UpdateLocation(LocationDto locationDto)
        {
            if (await _locationService.Update(locationDto))
            {
                 await _hubContext.Clients.All.loadLocation();
                return NoContent();
            }
                
            return BadRequest($"Updating Location {locationDto.Location_ID} Failed on save");

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _locationService.Delete(id))
            {
                await _hubContext.Clients.All.loadLocation();
                 return NoContent();
            }
               
            throw new Exception("Error deleting the Location ");
        }

    }
}