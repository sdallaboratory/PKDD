using Pkdd.Models.Persons;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pkdd.Repositories
{
    public interface IPersonRepository
    {
        Task<List<Person>> GetAllPersons();
        Task<Person> GetPerson(int id);
        Task<Person> AddPerson(Person person);
        Task UpdatePerson(Person person);
        Task RemovePerson(int id);

        Task<BaseBioBlock> GetMainBlock(int personId);

        Task<List<ContentBlock>> GetContentBlock(int baseBlockId);
        Task<ContentBlock> AddContentBlock(int? bioBlockId, ContentBlock content);
        Task UpdateContentBlock(ContentBlock content);
        Task RemoveContentBlock(int id);
    }
}
