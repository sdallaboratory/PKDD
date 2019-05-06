using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Pkdd.Database;
using System.Threading.Tasks;
using System.IO;

namespace Pkdd
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            SeedDatabase(host);
            host.Run();
        }

        private async static Task SeedDatabase(IWebHost host)
        {
            try
            {
                using (var scope = host.Services.CreateScope())
                {
                    var services = scope.ServiceProvider;
                    DbSeeder seeder = services.GetService<DbSeeder>();
                    await seeder.SeedAsync();
                }
            }
            catch (System.Exception e)
            {
                var a = 2;
                throw;
            }
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .UseKestrel()
            .UseContentRoot(Directory.GetCurrentDirectory())
            //.UseUrls("https://localhost:5001", "https://192.168.0.110:5001")
            .UseIISIntegration()
            .UseStartup<Startup>();
    }
}
