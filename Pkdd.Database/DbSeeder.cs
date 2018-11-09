using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Pkdd.Abstractions.Entity;
using Pkdd.Models.Persons;
using Pkdd.Models.Persons.Enums;
using Pkdd.Models.Users;
using Pkdd.Models.Users.Roles;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pkdd.Database
{
    public class DbSeeder
    {
        private readonly PkddDbContext _context;
        private readonly RoleManager<PkddRoleBase> _roleManager;
        private readonly UserManager<PkddUser> _userManager;

        private readonly int seedVersion = 2;

        public DbSeeder(PkddDbContext context, RoleManager<PkddRoleBase> roleManager, UserManager<PkddUser> userManager)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public async Task SeedAsync()
        {
            await _context.Database.EnsureCreatedAsync();

            if (await IsAlreadySeededAsync())
                return;

            await SeedRolesAsync();
            await SeedAdmin();
            await SeedPersonsAsync();
            await SeedMetaInformationAsync();
        }

        private async Task SeedRolesAsync()
        {
            List<PkddRoleBase> roles = new List<PkddRoleBase>() { new PkddRoleAdmin(), new PkddRoleExpert(), new PkddRoleTech() };
            foreach (PkddRoleBase role in roles)
                if (!await _roleManager.RoleExistsAsync(role.Name))
                    await _roleManager.CreateAsync(role.MarkCreated());
        }

        private async Task SeedAdmin()
        {
            PkddUser admin = new PkddUser() { Name = "Петр Андреевич Вяземский", Email = "admin@email.io" };
            admin.FillUserName();
            var result = await _userManager.CreateAsync(admin, "admin123321");
            var person = await _userManager.FindByEmailAsync("admin@email.io");
            await _userManager.AddToRolesAsync(person, new List<string>() { "admin", "tech", "expert" });
        }

        private async Task<bool> IsAlreadySeededAsync()
        {
            MetaInformation info = await _context.MetaInfos.FirstOrDefaultAsync();
            return info != null && info.Version >= seedVersion;
        }

        private async Task SeedMetaInformationAsync()
        {
            await _context.MetaInfos.AddAsync(new MetaInformation(seedVersion));
            await _context.SaveChangesAsync();
        }

        private async Task SeedPersonsAsync()
        {
            Person person = new Person()
            {
                Name = "Первый",
                Sex = Sexes.Undefined,
                Birthday = new DateTime(),
                Position = "",
                PhotoUrl = "",
                IsPublished = true,
                BioBlock = new BaseBioBlock()
                {
                    ContentBlocks = new List<ContentBlock>()
                    {
                        new ContentBlock()
                        {
                            Tilte = "Title",
                            Subtitle = "",
                            Type = ContentType.Container,
                            Content = "",
                            Order = "0/",
                            SubBlocks = new List<ContentBlock>(),
                        }
                    }
                }
            };
            await _context.Persons.AddAsync(person);
            await _context.SaveChangesAsync();
        }
    }

}
