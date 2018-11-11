using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pkdd.Controllers.Base;
using Pkdd.Models.Help;
using Pkdd.Repositories;

namespace Pkdd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HelpController : PkddControllerBase
    {
        private readonly IFeedbackRepository repository;

        public HelpController(IFeedbackRepository repository)
        {
            this.repository = repository;
        }

        [HttpPost("issues/{issueId}/answer")]
        public async Task<IActionResult> AddAnswer(int issueId, [FromBody] Answer answer)
        {
            try
            {
                var newAnswer = await repository.AddAnswer(issueId, answer);
                return PkddOk(newAnswer);
            }
            catch (Exception)
            {
                return PkddError("Ответ не был добавлен");
            }
        }

        [HttpPost("issues")]
        public async Task<IActionResult> AddIssue([FromBody] Issue issue)
        {
            try
            {
                var newIssue = await repository.AddIssue(issue);
                return PkddOk(newIssue);
            }
            catch (Exception)
            {
                return PkddError("Заявка не был добавлена");
            }
        }

        [HttpDelete("issues/{issueId}/answer")]
        public async Task<IActionResult> DeleteAnswer(int issueId, int id)
        {
            try
            {
                await repository.DeleteAnswer(id);
                return PkddOk();
            }
            catch (Exception)
            {
                return PkddError("Ответ не был удален");
            }
        }

        [HttpDelete("issues/{issueId}")]
        public async Task<IActionResult> DeleteIssue(int issueId)
        {
            try
            {
                await repository.DeleteIssue(issueId);
                return PkddOk();
            }
            catch (Exception)
            {
                return PkddError("Заявка не был удалена");
            }
        }

        [HttpGet("issues")]
        public async Task<IActionResult> GetIssues()
        {
            try
            {
                return PkddOk(await repository.GetIssues());
            }
            catch (Exception)
            {
                return PkddError("Ошибка при получении вопросов");
            }
        }

        [HttpGet("{userId}/issues")]
        public async Task<IActionResult> GetUserIssues(int userId)
        {
            try
            {
                return PkddOk(await repository.GetUserIssues(userId));
            }
            catch (Exception)
            {
                return PkddError("Ошибка при получении заявок");
            }
        }

        [HttpPut("issues/{issueId}/answer")]
        public async Task<IActionResult> UpdateAnswer(int issueId, [FromBody] Answer answer)
        {
            try
            {
                await repository.UpdateAnswer(answer);
                return PkddOk();
            }
            catch (Exception)
            {
                return PkddError("Ответ не был обновлен");
            }
        }

        [HttpPut("issues")]
        public async Task<IActionResult> UpdateIssue([FromBody] Issue issue)
        {
            try
            {
                await repository.UpdateIssue(issue);
                return PkddOk();
            }
            catch (Exception)
            {
                return PkddError("Заявка не был обновлена");
            }
        }

        [HttpPost("issues/{id}/solve")]
        public async Task<IActionResult> SolveIssue(int id)
        {
            try
            {
                await repository.SolveIssue(id);
                return PkddOk();
            }
            catch (Exception)
            {
                return PkddError("Ошибка при обновлении статуса заявки");
            }
        }

    }
}