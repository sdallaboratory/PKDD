using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using XTool.Algorithms;
using XTool.Data;
using XTool.Data.DB;
using XTool.Models.ActorModels;
using XTool.Models.EvaluationModels;
using XTool.Models.Roles;
using XTool.Models.Shared;
using XTool.Models.TransferModels.GraphApi;
using XTool.Models.UserManager;
using XTool.UserManager;

namespace XTool.Controllers
{
    public class ScalesController : Controller
    {
        private readonly XToolDbContext _context;
        private readonly UserManager<XToolUser> _userManager;

        protected ScalesController(XToolDbContext context, UserManager<XToolUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [Authorize("superadmin, admin, technologist")]
        public IActionResult TotalScales([FromBody] ScalesRequest request)
        {
            OperationResult result = null;
            Actor actor = _context.Find<Actor>(request.Id)?.LoadFrom(_context);
            if (actor == null)
                result = new OperationResult() { Status = Statuses.Error, Message = "Не существует актора с таким Id!" };
            else
            {
                int[] evaluationsIds = actor.Evaluations.Select(e => e.Id).ToArray();
                if (evaluationsIds.Length == 0)
                    result = new OperationResult() { Status = Statuses.Error, Message = "В системе нет ни одной оценке для указанного актора!" };
                else
                {
                    var scales = _context.Scales.Where(s => evaluationsIds.Contains(s.EvaluationId))?.RootMeanSquare();
                    result = new OperationResult() { Status = Statuses.Ok, Message = "Результирующая экспертная оценка успешно сформирована", Data = scales };
                }
            }
            return Json(result);
        }

        public XToolUser CurrentUser => _userManager.GetUser(User);

        //public async Task<IActionResult> IndividualScales(int id, int? expertId)
        //{
        //    XToolUser expert;
        //    OperationResult result = null;
        //    if (await _userManager.IsInRoleAsync(CurrentUser, "expert") && expertId == null)
        //        expertId = CurrentUser.Id;
        //    if (await _userManager.IsInRoleAsync(CurrentUser, "expert") && expertId != CurrentUser.Id)
        //        result = new OperationResult() { Status = Statuses.Forbidden, Message = "У вас недостаточно прав доступа для просмотра этой оценки!" };
        //    else if ((expert = _context.Users.Find(expertId)) != null)
        //    {
        //        Actor actor = _context.Find<Actor>(id)?.LoadFrom(_context);
        //        if (actor == null)
        //            result = new OperationResult() { Status = Statuses.Error, Message = "Не существует актора с таким Id!" };
        //        else
        //        {
        //            Evaluation evaluation = actor.Evaluations.FirstOrDefault(ev => ev.ExpertId == expert.Id);
        //            Scales scales = null;
        //            if (evaluation != null && (scales = _context.Scales.FirstOrDefault(scale => scale.EvaluationId == evaluation.Id)) != null)
        //            {
        //                result = new OperationResult() { Status = Statuses.Ok, Message = "Индивидуальная оценка успешно загружена.", Data = scales };
        //            }
        //            else
        //                result = new OperationResult() { Status = Statuses.Error, Message = "Этот эксперт ещё не поставил оценку данному актору!" };
        //        }
        //    }
        //    else
        //        result = new OperationResult() { Status = Statuses.Error, Message = "В системе не существует эксперта с таким Id!" };
        //    return Json(result);
        //}

        public async Task<IActionResult> IndividualScales(int id, int? expertId)
        {
            OperationResult result;
            try
            {
                bool isUserExpert = await _userManager.IsInRoleAsync(CurrentUser, "expert");
                if (isUserExpert && expertId == null)
                    expertId = CurrentUser.Id;

                if (isUserExpert && expertId != CurrentUser.Id)
                    throw new OperationResultException(Statuses.Forbidden, "У вас недостаточно прав доступа для просмотра этой оценки!");

                XToolUser expert = _context.Users.Find(expertId)
                    ?? throw new OperationResultException(Statuses.Error, "В системе не существует эксперта с таким Id!");

                Actor actor = _context.Find<Actor>(id)?.LoadFrom(_context)
                    ?? throw new OperationResultException(Statuses.Error, "В системе не существует актора с таким Id!");

                Evaluation evaluation = actor.Evaluations.FirstOrDefault(ev => ev.ExpertId == expert.Id)?.LoadFrom(_context);

                if (evaluation == null || evaluation.Scales == null)
                    throw new OperationResultException(Statuses.Error, "Этот эксперт ещё не поставил оценку данному актору!");

                result = new OperationResult() { Status = Statuses.Ok, Message = "Индивидуальная оценка успешно загружена.", Data = evaluation.Scales };
            }
            catch (OperationResultException e)
            {
                result = e.OperationResult;
            }
            catch (Exception e)
            {
                result = OperationResult.UnknownError;
            }
            return Json(result);
        }
    }
}