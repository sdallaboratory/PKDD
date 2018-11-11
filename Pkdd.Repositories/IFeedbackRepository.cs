using Pkdd.Models.Help;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pkdd.Repositories
{
    public interface IFeedbackRepository
    {
        Task<List<Issue>> GetIssues();

        Task<List<Issue>> GetUserIssues(int userId);

        Task<Issue> AddIssue(Issue issue);

        Task UpdateIssue(Issue issue);

        Task DeleteIssue(int id);

        Task<Answer> AddAnswer(int issueId, Answer answer);

        Task DeleteAnswer(int id);

        Task UpdateAnswer(Answer answer);

        Task SolveIssue(int id);

    }
}
