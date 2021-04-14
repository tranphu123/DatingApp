using System.Threading.Tasks;

namespace DatingApp.API.Models
{
    public interface IHubClient 
    {
        Task BroadcastMessage(); 
        Task Po();
    }
}