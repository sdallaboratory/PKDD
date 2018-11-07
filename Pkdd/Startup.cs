using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pkdd.Database;
using Pkdd.Models.Users;
using Pkdd.Models.Users.Roles;
using Pkdd.Users;
using Pkdd.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;

namespace Pkdd
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

            services.AddCors(cors => cors.AddPolicy("AllowAny", options =>
            {
                options.AllowAnyHeader();
                options.AllowAnyMethod();
                options.AllowAnyOrigin();
                options.AllowCredentials();
            }));

            services.AddDbContext<PkddDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<PkddUser, PkddRoleBase>(options =>
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
            }).AddEntityFrameworkStores<PkddDbContext>();
            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
            //    options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
            //})
;
            services.AddPersonRepository();
            services.AddTransient<DbSeeder, DbSeeder>();

            services.AddPkddUsers();

            services.AddLogging();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseCors("AllowAny");
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc(routes => routes.MapRoute(
                    name: "Default",
                    template: "{*AngularRoute}",
                    defaults: new { controller = "Home", action = "Index" }));
    }
}
}
