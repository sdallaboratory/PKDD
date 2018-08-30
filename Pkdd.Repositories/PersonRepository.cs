using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pkdd.Database;
using Pkdd.Models.Person;

namespace Pkdd.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly PkddDbContext _dbContext;

        public PersonRepository(PkddDbContext context)
        {
            _dbContext = context;
        }

        public async Task<ContentBlock> AddContentBlock(ContentBlock content)
        {
            ContentBlock result = null;
            try
            {
                var entity = await _dbContext.ContentBlocks.AddAsync(content);
                await _dbContext.SaveChangesAsync();
                result = entity.Entity;
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }

        public async Task<Person> AddPerson(Person person)
        {
            Person result = null;
            try
            {
                var entity = await _dbContext.Persons.AddAsync(person);
                await _dbContext.SaveChangesAsync();
                result = entity.Entity;
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }

        public async Task<List<Person>> GetAllPersons()
        {
            List<Person> persons = null;
            try
            {
                persons = await _dbContext.Persons.Include(p => p.BioBlock).ThenInclude(b => b.ContentBlocks).ToListAsync();
                foreach(Person person in persons)
                {
                    foreach(ContentBlock block in person.BioBlock.ContentBlocks)
                    {
                        await LoadBlocks(block);
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return persons;
        }

        public async Task<List<ContentBlock>> GetContentBlock(int baseBlockId)
        {
            List<ContentBlock> result = null;
            try
            { 
                BaseBioBlock mainBlock = await _dbContext.MainBioBlocks.FirstOrDefaultAsync(b => b.Id == baseBlockId);
                if(mainBlock != null)
                {
                    foreach(ContentBlock block in mainBlock.ContentBlocks)
                    {
                        await LoadBlocks(block);
                    }
                    result = mainBlock.ContentBlocks;
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }

        public async Task<Person> GetPerson(int id)
        {
            Person person = null;
            try
            {
                person = await _dbContext.Persons.Where(p => p.Id == id).Include(p => p.BioBlock).ThenInclude(b => b.ContentBlocks).FirstOrDefaultAsync();
                foreach (ContentBlock block in person.BioBlock.ContentBlocks)
                {
                    await LoadBlocks(block);
                }
            }
            catch (Exception)
            {
                throw;
            }
            return person;
        }

        public async Task RemoveContentBlock(int id)
        {
            try
            {
                ContentBlock contentBlock = await _dbContext.ContentBlocks.FirstOrDefaultAsync(b => b.Id == id);
                if (contentBlock != null)
                {
                    _dbContext.ContentBlocks.Remove(contentBlock);
                    await _dbContext.SaveChangesAsync();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task RemovePerson(int id)
        {
            try
            {
                Person person = await _dbContext.Persons.FirstOrDefaultAsync(p => p.Id == id);
                if (person != null)
                {
                    _dbContext.Persons.Remove(person);
                    await _dbContext.SaveChangesAsync();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task UpdateContentBlock(ContentBlock block)
        {
            try
            {
                ContentBlock contentBlock = await _dbContext.ContentBlocks.FirstOrDefaultAsync(b => b.Id == block.Id);
                if (contentBlock != null)
                {
                    contentBlock.Update(block);
                    _dbContext.ContentBlocks.Update(contentBlock);
                    await _dbContext.SaveChangesAsync();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task UpdatePerson(Person person)
        {
            try
            {
                Person oldPerson = await _dbContext.Persons.FirstOrDefaultAsync(p => p.Id == person.Id);
                if (oldPerson != null)
                {
                    oldPerson.Update(person);
                    _dbContext.Persons.Update(oldPerson);
                    await _dbContext.SaveChangesAsync();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        private async Task LoadBlocks(ContentBlock block)
        {
            await _dbContext.Entry(block).Collection(b => b.SubBlocks).LoadAsync();
            foreach(ContentBlock subblock in block.SubBlocks)
            {
                await LoadBlocks(subblock);
            }
        }
    }
}
