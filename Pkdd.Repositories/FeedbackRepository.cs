using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pkdd.Database;
using Pkdd.Models.Help;

namespace Pkdd.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly PkddDbContext context;

        public FeedbackRepository(PkddDbContext dbContext)
        {
            context = dbContext;
        }

        public async Task<Answer> AddAnswer(int issueId, Answer answer)
        {
            try
            {
                Issue issue = await context.Issues.FirstOrDefaultAsync(iss => iss.Id == issueId);
                if (issue == null)
                    throw new Exception();
                answer.IssueId = issueId;
                var entity = await context.FeedbackAnswers.AddAsync(answer);
                await context.SaveChangesAsync();
                return entity.Entity;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<Issue> AddIssue(Issue issue)
        {
            try
            {
                var entity = await context.Issues.AddAsync(issue);
                await context.SaveChangesAsync();
                return entity.Entity;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DeleteAnswer(int id)
        {
            try
            {
                Answer answer = await context.FeedbackAnswers.FirstOrDefaultAsync(ans => ans.Id == id);
                if (answer == null)
                    throw new Exception();
                context.FeedbackAnswers.Remove(answer);
                await context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DeleteIssue(int id)
        {
            try
            {
                Issue issue = await context.Issues.FirstOrDefaultAsync(iss => iss.Id == id);
                if (issue == null)
                    throw new Exception();
                context.Issues.Remove(issue);
                await context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<Issue>> GetIssues()
        {
            try
            {
                return await context.Issues.Include(iss => iss.Answers).ToListAsync() ?? new List<Issue>();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<Issue>> GetUserIssues(int userId)
        {
            try
            {
                return await context.Issues
                    .Where(iss => iss.User.UserId == userId)
                    .Include(iss => iss.Answers)
                    .ToListAsync() ?? new List<Issue>();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task UpdateAnswer(Answer answer)
        {
            try
            {
                Answer oldAnswer = await context.FeedbackAnswers.FirstOrDefaultAsync(ans => ans.Id == answer.Id);
                if (oldAnswer == null)
                    throw new Exception();
                context.FeedbackAnswers.Update(oldAnswer.Update(answer));
                await context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task UpdateIssue(Issue issue)
        {
            try
            {
                Issue oldIssue = await context.Issues.FirstOrDefaultAsync(iss => iss.Id == issue.Id);
                if (oldIssue == null)
                    throw new Exception();
                context.Issues.Update(oldIssue.Update(issue));
                await context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task SolveIssue(int id)
        {
            try
            {
                Issue issue = await context.Issues.FirstOrDefaultAsync(iss => iss.Id == id);
                if (issue == null)
                    throw new Exception();
                issue.IsSolved = !issue.IsSolved;
                context.Issues.Update(issue);
                await context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
