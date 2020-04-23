using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository<T> : IDatingRepository<T> where T : class
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;

        }

       public void Add(T entity)
        {
            _context.Add(entity);
        }

      public  IQueryable<T> FindAll(params Expression<Func<T, object>>[] includeProperties)
        {
           IQueryable<T> items =_context.Set<T>();
           if (includeProperties !=null)
           {
               foreach(var includeProperty in includeProperties)
               {
                   items = items.Include(includeProperty);
               }
           }
           return items.AsQueryable();
        }

      public  T FindById(object id)
        {
           return _context.Set<T>().Find(id);
        }

       public IQueryable<T> GetAll()
        {
          return _context.Set<T>().AsQueryable();
        }

        public void Remove(object id)
        {
            Remove(FindById(id));
        }
         public void Remove(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0;
        }

        void IDatingRepository<T>.Upadate(T entity)
        {
           _context.Set<T>().Update(entity);
        }
    }
}