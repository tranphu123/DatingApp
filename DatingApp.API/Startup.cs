using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API._Repositories.Interface;
using DatingApp.API._Repositories.Repositories;
using DatingApp.API._Services.Interface;
using DatingApp.API._Services.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AutoMapper;
using DatingApp.API.Helpers.AutoMapper;
using DatingApp.API.HubConfig;

namespace DatingApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {   
              services.AddCors(options =>
                {
                    options.AddPolicy("CorsPolicy",
                        builder => builder.WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
                });
            // services.AddCors();
            services.AddSignalR();  
            services.AddMvc(option => option.EnableEndpointRouting = false);
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddControllers();
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
          
          
          services.AddAutoMapper(typeof(Startup));
            services.AddScoped<IMapper>(sp =>
            {
                return new Mapper(AutoMapperConfig.RegisterMappings());
            });
            services.AddSingleton(AutoMapperConfig.RegisterMappings());
           services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            //Respository
            services.AddScoped<ILocationRepository,LocationRepository>();
             services.AddScoped<IAuthRespository,AuthRespository>();
             services.AddScoped<IPoRepository,PoRepository>();
             services.AddScoped<IOrderPartRepository,OrderPartRepository>();
    
            //Service
            services.AddScoped<ILocationService,LocationService>();
            services.AddScoped<IPoService,PoService>();
            services.AddScoped<IOrderPartService,OrderPartService>();
            services.AddScoped<IReportService,ReportService>();
 
          
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();     
          
            // app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
              app.UseCors("CorsPolicy"); 
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<BroadcastHub>("/dateApp");  
            });
        }
    }
}
