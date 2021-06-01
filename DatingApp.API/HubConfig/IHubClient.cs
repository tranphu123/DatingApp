using System.Threading.Tasks;

namespace DatingApp.API.HubConfig
{
    public interface IHubClient
    {
           Task loadLocation();  
           Task loadPo();  
    }
}