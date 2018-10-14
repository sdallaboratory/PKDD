using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pkdd.Database;
using Pkdd.Models.Person;
using Pkdd.Repositories.Exceptions;

namespace Pkdd.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly PkddDbContext _dbContext;

        public PersonRepository(PkddDbContext context)
        {
            _dbContext = context;
        }

        public async Task<ContentBlock> AddContentBlock(int bioBlockId, ContentBlock content, int? parentId)
        {
            ContentBlock result = null;
            try
            {
                if (!parentId.HasValue)
                {
                    BaseBioBlock mainBlock = await _dbContext.MainBioBlocks
                                                             .Include(b => b.ContentBlocks)
                                                             .FirstOrDefaultAsync(b => b.Id == bioBlockId);
                    if (mainBlock != null)
                    {
                        var entity = _dbContext.Entry(content);
                        mainBlock.ContentBlocks.Add(content);
                        await _dbContext.SaveChangesAsync();
                        result = entity.Entity;
                    }
                    else
                    {
                        throw new NotFoundException("Сущность не найдена");
                    }
                }
                else
                {
                    var block = await AddToParent(content, parentId.Value);
                    await LoadBlocks(block);
                    result = block;
                }
            }
            catch (Exception ex)
            {
                ThrowException(ex);
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
            catch (Exception ex)
            {
                ThrowException(ex);
            }
            return result;
        }

        public async Task<List<Person>> GetAllPersons()
        {
            List<Person> persons = null;
            try
            {
                persons = await _dbContext.Persons.Include(p => p.BioBlock).ToListAsync();
                if (persons == null || !persons.Any())
                {
                    throw new NotFoundException("Сущность не найдена");
                }
            }
            catch (Exception ex)
            {
                ThrowException(ex);
            }
            return persons;
        }

        public async Task<List<ContentBlock>> GetContentBlock(int baseBlockId)
        {
            List<ContentBlock> result = null;
            try
            { 
                BaseBioBlock mainBlock = await _dbContext.MainBioBlocks.Include(b => b.ContentBlocks).FirstOrDefaultAsync(b => b.Id == baseBlockId);
                if(mainBlock != null)
                {
                    foreach(ContentBlock block in mainBlock.ContentBlocks)
                    {
                        await LoadBlocks(block);
                    }
                    result = mainBlock.ContentBlocks;
                }
                else
                {
                    throw new NotFoundException("Сущность не найдена");
                }
            }
            catch (Exception ex)
            {
                ThrowException(ex);
            }
            return result;
        }

        public async Task<List<ContentBlock>> GetAllContentBlocks()
        {

            List<ContentBlock> result = null;
            try
            {
                result = await _dbContext.ContentBlocks.ToListAsync();
                if (result == null || !result.Any())
                {
                    throw new NotFoundException("Сущность не найдена");
                }
            }
            catch (Exception ex)
            {
                ThrowException(ex);
            }
            return result;
        }

        public async Task<Person> GetPerson(int id)
        {
            Person person = null;
            try
            {
                person = await _dbContext.Persons.Where(p => p.Id == id).Include(p => p.BioBlock).FirstOrDefaultAsync();
                if(person == null)
                {
                    throw new NotFoundException("Сущность не найдена");
                }
            }
            catch (Exception ex)
            {
                ThrowException(ex);
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
                else
                {
                    throw new NotFoundException("Сущность не найдена");
                }
            }
            catch (Exception ex)
            {
                ThrowException(ex);
            }
        }

        public async Task<BaseBioBlock> GetMainBlock(int personId)
        {
            BaseBioBlock mainBlock = null;
            try
            {
                mainBlock = await _dbContext.MainBioBlocks.Where(b => b.PersonId == personId).Include(m => m.ContentBlocks).FirstOrDefaultAsync();
                if (mainBlock != null)
                {
                    foreach (ContentBlock block in mainBlock.ContentBlocks)
                    {
                        await LoadBlocks(block);
                    }
                }
                else
                {
                    throw new NotFoundException("Сущность не найдена");
                }
            }
            catch (Exception ex)
            {
                ThrowException(ex);
            }
            return mainBlock;
        }

        public async Task RemovePerson(int id)
        {
            try
            {
                Person person = await _dbContext.Persons.Include(p => p.BioBlock)
                                                        .ThenInclude(b => b.ContentBlocks)
                                                        .FirstOrDefaultAsync(p => p.Id == id);
                if (person != null)
                {
                    if (person.BioBlock != null && person.BioBlock.ContentBlocks != null)
                    {
                        ImmutableList<ContentBlock> immutableBlocks = person.BioBlock.ContentBlocks.ToImmutableList();
                        foreach (ContentBlock block in immutableBlocks)
                        {
                            await RemoveBlocks(block);
                        }
                    }
                    _dbContext.Persons.Remove(person);
                    await _dbContext.SaveChangesAsync();
                }
                else
                {
                    throw new NotFoundException("Сущность не найдена");
                }
            }
            catch (Exception ex)
            {
                ThrowException(ex);
            }
        }

        public async Task UpdateContentBlock(ContentBlock block)
        {
            try
            {
                ContentBlock contentBlock = await _dbContext.ContentBlocks.FirstOrDefaultAsync(b => b.Id == block.Id);
                if (contentBlock != null)
                {
                    await LoadBlocks(contentBlock);
                    await UpdateBlocks(contentBlock, block);
                }
                else
                {
                    throw new NotFoundException("Сущность не найдена");
                }
            }
            catch (Exception ex)
            {
                ThrowException(ex);
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
                else
                {
                    throw new NotFoundException("Сущность не найдена");
                }
            }
            catch (Exception ex)
            {
                ThrowException(ex);
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

        private async Task<ContentBlock> AddToParent(ContentBlock content, int parentId)
        {
            ContentBlock parent = await _dbContext.ContentBlocks.Where(b => b.Id == parentId)
                                                                .Include(b => b.SubBlocks)
                                                                .FirstOrDefaultAsync();
            if(parent == null)
            {
                throw new NotFoundException("Сущность не найдена");
            }
            var entity  = _dbContext.Entry(content);
            parent.SubBlocks.Add(content);
            await _dbContext.SaveChangesAsync();
            return entity.Entity;
            
        }

        private async Task UpdateBlocks(ContentBlock target, ContentBlock source)
        {
            target.Update(source);
            _dbContext.ContentBlocks.Update(target);
            foreach (ContentBlock subblock in target.SubBlocks)
            {
                await UpdateBlocks(subblock, source.SubBlocks.Where(b => b.Id == subblock.Id).First());
            }
            await _dbContext.SaveChangesAsync();
        }

        private async Task RemoveBlocks(ContentBlock block)
        {
            await _dbContext.Entry(block).Collection(b => b.SubBlocks).LoadAsync();
            _dbContext.ContentBlocks.Remove(block);
            foreach (ContentBlock subblock in block.SubBlocks)
            {
                await RemoveBlocks(subblock);
            }
            await _dbContext.SaveChangesAsync();
        }

        private void ThrowException(Exception ex)
        {
            if (ex is NotFoundException || ex is SaveException)
            {
                throw ex;
            }
            else
            {
                throw new SaveException("Ошибка сохранения сущности", ex);
            }
        }
    }
}
