using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using XTool.Data;
using XTool.Data.DB;
using XTool.Models.Roles;

namespace XTool
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = BuildWebHost(args);
            await SeedDatabase(host);
            host.Run();
        }

        private async static Task SeedDatabase(IWebHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    await Seeder.Seed(services);
                    //await seeder.First().Seed();
                }
                catch
                {
                }
            }
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
