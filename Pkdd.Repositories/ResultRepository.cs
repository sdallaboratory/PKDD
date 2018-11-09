using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pkdd.Abstractions.Entity;
using Pkdd.Database;
using Pkdd.Models.Results;
using Pkdd.Users;
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
        private readonly IPkddUserRepository _users;

        public ResultRepository(PkddDbContext context, IPkddUserRepository users)
        {
            _context = context;
            _users = users;
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

        public async Task<IEnumerable<TestResult>> GetPersonResults(int personId)
        {
            List<TestResult> results = await _context.TestResults.Include(r => r.PkddUser).Where(r => r.PersonId == personId).ToListAsync();
            //var pairs = results.Select(r => new { Result = r, Task = _users.ToPkddUserInfoAsync(r.PkddUser) });
            //await Task.WhenAll(pairs.Select(pair => pair.Task));
            //foreach (var pair in pairs)
            //{
            //    pair.Result.UserInfo = pair.Task.Result;
            //    pair.Result.PkddUser = null;
            //}
            foreach (var result in results)
            {
                result.UserInfo = await _users.ToPkddUserInfoAsync(result.PkddUser);
                result.PkddUser = null;
            }
            return results;
        }

    }
}
