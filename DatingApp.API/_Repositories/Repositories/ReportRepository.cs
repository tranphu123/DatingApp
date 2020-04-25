using DatingApp.API._Repositories.Interface;
using DatingApp.API.Data;
using DatingApp.API.Dtos;

namespace DatingApp.API._Repositories.Repositories
{
    public class ReportRepository:DatingRepository<ReportDto> ,IReportRepository
    {
        private readonly DataContext _context;

        public ReportRepository(DataContext context):base(context)
        {
            _context = context;
        }
    }
}