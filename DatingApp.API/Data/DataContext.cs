using Microsoft.EntityFrameworkCore;
using DatingApp.API.Models;
namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options){}
        public DbSet<WeatherForecast> WeatherForecast {get ; set;}
        public DbSet<Users> Users{get; set;}
        public DbSet<Location> Location{get;set;}
    }
}