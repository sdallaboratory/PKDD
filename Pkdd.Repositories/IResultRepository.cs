﻿using Pkdd.Models.Results;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pkdd.Repositories
{
    public interface IResultRepository
    {
        TestResult AddOrUpdateResult(TestResult result);

        TestResult GetResult(int id);

        // returns test result for specified person by specified expert if it exists, else null.
        TestResult GetResult(int userId, int personId);

        IEnumerable<TestResult> GetUserResults(int userId);

        Task<IEnumerable<TestResult>> GetPersonResults(int personId);
    }
}
