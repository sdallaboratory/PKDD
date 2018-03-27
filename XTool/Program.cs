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
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);
            SeedDatabase(host);
            host.Run();
        }

        private static void SeedDatabase(IWebHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<XToolDbContext>();
                    //foreach (var DbItem in context.Scales)/* Concat<object>(context.Evaluations).Concat<object>())*/
                    //    context.Remove(DbItem);
                    //context.SaveChanges();
                    //foreach (var DbItem in context.Evaluations)/* Concat<object>(context.Evaluations).Concat<object>())*/
                    //    context.Remove(DbItem);
                    //context.SaveChanges();
                    context.Init();
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
