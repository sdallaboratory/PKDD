using Microsoft.AspNetCore.Mvc;
using Pkdd.Abstractions.Entity;
using Pkdd.Database;
using Pkdd.Models.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pkdd.Repositories
{
    class ResultRepository : IResultRepository
    {
        private readonly PkddDbContext _context;

        public ResultRepository(PkddDbContext context)
        {
            _context = context;
        }

        public TestResult AddOrUpdateResult([FromBody] TestResult result)
        {
            var storedResult = _context.TestResults.SingleOrDefault(res => res.PersonId == result.PersonId && res.PkddUserId == result.PkddUserId);
            if (storedResult == null)
            {
                result.MarkCreated();
                storedResult = _context.Add(result).Entity;
            }
            else
            {
                storedResult.Update(result);
                _context.Update(storedResult);
            }
            _context.SaveChanges();
            return storedResult;
        }

        public TestResult GetResult(int id)
        {
            return _context.Find<TestResult>(id);
        }

        // returns test result for specified person by specified expert if it exists, else null.
        public TestResult GetResult(int userId, int personId)
        {
            return _context.TestResults.SingleOrDefault(r => r.PkddUserId == userId && r.PersonId == personId);
        }

        public IEnumerable<TestResult> GetUserResults(int userId)
        {
            return _context.TestResults.Where(r => r.PkddUserId == userId);
        }

        public IEnumerable<TestResult> GetPersonResults(int personId)
        {
            return _context.TestResults.Where(r => r.PersonId == personId);
        }

    }
}
