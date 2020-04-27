using System.Threading.Tasks;
using DatingApp.API.Dtos;

namespace DatingApp.API._Services.Interface
{
    public interface ILocationService : IDatingService<LocationDto>
    {
         Task<bool> importExcel(string filePath);
    }
}