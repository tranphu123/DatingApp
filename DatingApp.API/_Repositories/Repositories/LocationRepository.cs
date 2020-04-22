using DatingApp.API._Repositories.Interface;
using DatingApp.API.Data;
using DatingApp.API.Models;

namespace DatingApp.API._Repositories.Repositories
{
    public class LocationRepository : DatingRepository<Location>, ILocationRepository
    {
        private readonly DataContext _context;

        public LocationRepository(DataContext context):base(context)
        {
            _context = context;
        }
    }
}