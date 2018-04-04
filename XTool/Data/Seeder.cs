using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.DB;
using XTool.Models.Roles;
using XTool.Models.TransferModels;
using XTool.UserManager;

namespace XTool.Data
{
    public class Seeder
    {
        public static async Task Seed(IServiceProvider provider)
        {
            XToolDbContext context = provider.GetRequiredService<XToolDbContext>();
            UserManager<XToolUser> userManager = provider.GetRequiredService<UserManager<XToolUser>>();
            RoleManager<XToolRole> roleManager = provider.GetRequiredService<RoleManager<XToolRole>>();

            List<XToolRole> roles = new List<XToolRole>() { new SuperadminRole(), new AdminRole(), new TechnologistRole(), new ExpertRole() };
            foreach (XToolRole role in roles)
                if (!await roleManager.RoleExistsAsync(role.Name))
                    await roleManager.CreateAsync(role);

            context.Init();

            UserRegisterModel model = new UserRegisterModel() { Email = "admin@email.io", Name = "Пётр Андреевич Вяземский", Password = "SysAdmin123", PasswordRepeat = "SysAdmin123", RoleName = "superadmin" };
            await userManager.RegisterConfirmedUserAsync(model);
        }
    }
}
