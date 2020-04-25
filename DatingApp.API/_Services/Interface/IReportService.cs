using System.Threading.Tasks;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.viewModel;

namespace DatingApp.API._Services.Interface
{
    public interface  IReportService : IDatingService<ReportDto>
    {
        Task<PagedList<ReportDto>> GetAllReport(PaginationParams param);
        Task<PagedList<ReportDto>> SearchByModel(PaginationParams param, ReportSearch model);
    }
}