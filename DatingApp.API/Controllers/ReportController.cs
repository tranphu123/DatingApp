using System.Threading.Tasks;
using DatingApp.API._Services.Interface;
using DatingApp.API.Helpers;
using DatingApp.API.viewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }
        [HttpGet("all", Name = "GetAllReport")]
        public async Task<IActionResult> GetAllReport([FromQuery] PaginationParams param)
        {
            var report = await _reportService.GetAllReport(param);
            Response.AddPagination(report.CurrentPage,report.PageSize,report.TotalCount,report.TotalPages);
            return Ok(report);
        }
        [HttpPost( Name = "SearchReportByModel")]
        public async Task<IActionResult> GetReportByModel([FromQuery] PaginationParams param,
                                                            ReportSearch reportSearch)
        {
            var report =await _reportService.SearchByModel(param,reportSearch);
            Response.AddPagination(report.CurrentPage,report.PageSize,report.TotalCount,report.TotalPages);
            return Ok(report);
        }
    }
}