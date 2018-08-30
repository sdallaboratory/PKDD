using Microsoft.EntityFrameworkCore;
using Pkdd.Models.Person;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pkdd.Database
{
    public class DbSeeder
    {
        private readonly PkddDbContext _context;

        private readonly int seedVersion = 1;

        public DbSeeder(PkddDbContext context)
        {
            _context = context;
        }

        public async Task SeedData()
        {
            if (!await IsDataAlreadySeeded())
            {
                await SeedMetaInformation();
                await SeedPersons();
            }
        }

        private async Task SeedPersons()
        {
            List<Person> persons = new List<Person>()
            {
                new Person()
                {
                    Name = "test",
                    Sex = Models.Sexes.Male,
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
                                Type = Models.Person.Enums.ContentType.Container,
                                SubBlocks = new List<ContentBlock>()
                                {
                                    new ContentBlock()
                                    {
                                        Tilte = "sub",
                                        Content = "subcont",
                                        Type = Models.Person.Enums.ContentType.DateText,
                                        SubBlocks = new List<ContentBlock>()
                                        {
                                            new ContentBlock()
                                            {
                                                Tilte = "subsub",
                                                Type = Models.Person.Enums.ContentType.Photo,
                                            }
                                        }
                                    },
                                    new ContentBlock()
                                    {
                                        Tilte = "sub",
                                        Content = "subcont",
                                        Type = Models.Person.Enums.ContentType.DateText,
                                    },
                                    new ContentBlock()
                                    {
                                        Tilte = "sub",
                                        Content = "subcont",
                                        Type = Models.Person.Enums.ContentType.DateText,
                                    },

                                }
                            },
                            new ContentBlock()
                            {
                                Tilte = "sadsad",
                                Content = "sadsad",
                                Type = Models.Person.Enums.ContentType.Container,
                            },
                            new ContentBlock()
                            {
                                Tilte = "sadsad",
                                Content = "sadsad",
                                Type = Models.Person.Enums.ContentType.Container,
                            }
                        }
                    }
                }
            };
            await _context.AddRangeAsync(persons);
            await _context.SaveChangesAsync();
        }

        private async Task SeedMetaInformation()
        {
            List<MetaInformation> info = new List<MetaInformation>()
            {
                new MetaInformation()
                {
                    Version = seedVersion
                }
            };
            await _context.MetaInfos.AddRangeAsync(info);
            await _context.SaveChangesAsync();
        }

        private async Task<bool> IsDataAlreadySeeded()
        {
            MetaInformation info = null;
            try
            {
                info = await _context.MetaInfos.FirstOrDefaultAsync();
            }
            catch (Exception e)
            {

            }
            return info != null && info.Version >= seedVersion;
        }
    }
}
