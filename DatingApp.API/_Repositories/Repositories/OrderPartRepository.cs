using DatingApp.API._Repositories.Interface;
using DatingApp.API.Data;
using DatingApp.API.Models;

namespace DatingApp.API._Repositories.Repositories
{
    public class OrderPartRepository : DatingRepository<Order_Part>, IOrderPartRepository
    {
        private readonly DataContext _context;
        public OrderPartRepository(DataContext context):base(context)
        {
           _context = context;

        }
    }
}