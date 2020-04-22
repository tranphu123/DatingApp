using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helpers;

namespace DatingApp.API._Services.Interface
{
    public interface IDatingService<T>where T : class
    {
        Task<bool> Add(T Model);
        Task<bool> Update(T Model);
        Task<bool> Delete(object id);
        Task<List<T>> GetAllAsync();
        Task<PagedList<T>> GetwithPaginations(PaginationParams param);
        Task<PagedList<T>> Search(PaginationParams param ,object text);
        T GetByID(object id);      }
}