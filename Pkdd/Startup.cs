using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pkdd.Database;
using Pkdd.Models.Users;
using Pkdd.Models.Users.Roles;
using Pkdd.Repositories;
using Pkdd.Users;
using System;

namespace Pkdd
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            Environment = env;

            Console.WriteLine($"\n{Environment.ApplicationName} is started in hosting environment: {Environment.EnvironmentName}\n\n");
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(cors => cors.AddPolicy("AllowAny", options =>
             {
                 options.AllowAnyHeader();
                 options.AllowAnyMethod();
                 options.AllowAnyOrigin();
                 options.AllowCredentials();
             }));

            services.AddDbContext<PkddDbContext>(options =>
                //options.UseSqlServer(Configuration.GetConnectionString("LocalConnection")));
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<PkddUser, PkddRoleBase>(options =>
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
            }).AddEntityFrameworkStores<PkddDbContext>()
            .AddDefaultTokenProviders();

            services.AddAuthentication().Services.ConfigureApplicationCookie(options =>
            {
                options.SlidingExpiration = true;
                options.ExpireTimeSpan = TimeSpan.FromDays(7);
            });

            services.AddPersonRepository();
            services.AddResultRepository();
            services.AddFeedbackRepository();
            services.AddTransient<DbSeeder>();

            services.AddPkddUsers();

            services.AddLogging();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            app.UseCors("AllowAny");

            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();

            app.UseSpa(spa =>
            {
                if (Environment.IsDevelopment())
                {
                    Console.WriteLine("Connecting to development Angular CLI server...");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                    //spa.Options.SourcePath = "pkdd-ng-client";
                    // spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }

    }
}

