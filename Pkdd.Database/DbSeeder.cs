using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Pkdd.Abstractions.Entity;
using Pkdd.Models.Persons;
using Pkdd.Models.Persons.Enums;
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

        private readonly int seedVersion = 2;

        public DbSeeder(PkddDbContext context, RoleManager<PkddRoleBase> roleManager)
        {
            _context = context;
            _roleManager = roleManager;
        }

        public async Task SeedAsync()
        {
            await _context.Database.EnsureCreatedAsync();

            if (await IsAlreadySeededAsync())
                return;

            await SeedRolesAsync();
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
            List<Person> persons = new List<Person>()
            {
                new Person()
                {
                    Name = "test",
                    Sex = Sexes.Male,
                    Birthday = DateTime.Now,
                    Position = "asdasd",
                    BioBlock = new BaseBioBlock()
                    {
                        ContentBlocks = new List<ContentBlock>()
                        {
                            new ContentBlock()
                            {
                                Tilte = "with inside",
                                Content = "sadsad",
                                Type = Models.Persons.Enums.ContentType.Container,
                                SubBlocks = new List<ContentBlock>()
                                {
                                    new ContentBlock()
                                    {
                                        Tilte = "sub",
                                        Content = "subcont",
                                        Type = Models.Persons.Enums.ContentType.DateText,
                                        SubBlocks = new List<ContentBlock>()
                                        {
                                            new ContentBlock()
                                            {
                                                Tilte = "subsub",
                                                Type = Models.Persons.Enums.ContentType.Photo,
                                                Content = "asd"
                                            }
                                        }
                                    },
                                    new ContentBlock()
                                    {
                                        Tilte = "sub",
                                        Content = "subcont",
                                        Type = Models.Persons.Enums.ContentType.DateText,
                                    },
                                    new ContentBlock()
                                    {
                                        Tilte = "sub",
                                        Content = "subcont",
                                        Type = Models.Persons.Enums.ContentType.DateText,
                                    },

                                }
                            },
                            new ContentBlock()
                            {
                                Tilte = "sadsad",
                                Content = "sadsad",
                                Type = Models.Persons.Enums.ContentType.Container,
                            },
                            new ContentBlock()
                            {
                                Tilte = "sadsad",
                                Content = "sadsad",
                                Type = Models.Persons.Enums.ContentType.Container,
                            }
                        }
                    }
                }
            };
            await _context.AddRangeAsync(persons);
            await _context.SaveChangesAsync();
        }
    }

}
