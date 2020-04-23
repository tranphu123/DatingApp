using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public  interface IDatingRepository<T> where T:class
    {
        void Add(T entity);
        void Remove(T entity);
        void Remove(object id);
        void Upadate(T entity);
        IQueryable<T> GetAll();
        Task<bool> SaveAll();
         T FindById(object id);
         IQueryable<T> FindAll(params Expression<Func<T, object>>[] includeProperties);
       
    }
}