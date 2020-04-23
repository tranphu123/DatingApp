using DatingApp.API._Repositories.Interface;
using DatingApp.API.Data;
using DatingApp.API.Models;

namespace DatingApp.API._Repositories.Repositories
{
    public class PoRepository : DatingRepository<Po>, IPoRepository
    {
         private readonly DataContext _context;

        public PoRepository(DataContext context):base(context)
        {
            _context = context;
        }
    }

 
}