using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using XTool.Models;
using XTool.Data;
using XTool.Models.ActorModels;
using XTool.Data.Storage;
using XTool.Models.Roles;
using XTool.UserManager;
using XTool.Models.Shared;
using XTool.Models.UserManager;
using XTool.Models.EvaluationModels;

namespace XTool.Controllers
{
    [Authorize]
    //[Route("[action]")]
    public class HomeController : Controller
    {
        private readonly IStorage<int> _storage;
        private readonly UserManager<XToolUser> _userManager;

        public HomeController(IStorage<int> storage, UserManager<XToolUser> userManager) // тут поставить Сторадж
        {
            _storage = storage;
            _userManager = userManager;
        }

        public IActionResult Actors()
        {
            var actors = _storage.GetAll<Actor>();
            var actualActors = actors.OrderBy(a => 12).Take(3); // Вот эту троечку вынести в конфиг // тут отсортировать по релевантности перед Take
            foreach (Actor actor in actualActors)
                LoadActor(actor);
            ViewBag.ActualActors = actualActors;
            ViewBag.Actors = actors.Take(20);
            return View();
        }

        public async Task<IActionResult> Actor(int id)
        {
            IActionResult result = View();
            var actor = _storage.Get<Actor>(id);
            if (actor != null)
                LoadActor(actor);
            ViewBag.Actor = actor;
            if (!User.IsInRole("expert"))
            {
                //ViewBag.Scales = EvaluationScales(actor.Evaluations.FirstOrDefault(e => e.ExpertId == CurrentUser.Id)); // 
                result = View("TechnologistActor");
            }
            else
            {
                ViewBag.Scales = EvaluationScales(actor.Evaluations.FirstOrDefault(e => e.ExpertId == CurrentUser.Id && e.ActorId == id));
                int userId = (await _userManager.GetUserAsync(User)).Id;
                ViewBag.Evaluation = _storage.GetAll<Evaluation>().FirstOrDefault(e => e.ActorId == id && e.ExpertId == userId);
            }
            return result;
        }

        /// <summary>
        /// Выгружает из БД все поля для данного актора
        /// </summary>
        /// <param name="actor">актор</param>
        private void LoadActor(Actor actor)
        {
            foreach (var collection in _storage.Context.Entry(actor).Collections)
            {
                collection.Load();
            }
            foreach (var period in actor.CareerPeriods)
            {
                _storage.Context.Entry(period).Collection(p => p.CareerEvents).Load();
            }
        }

        public IActionResult CreateActor(Actor actor)
        {
            IActionResult result = null;
            int actorId = -1;
            if (_storage.GetAll<Actor>().FirstOrDefault(actr => actr.Name == actor.Name) != null)
            {
                result = Json(new OperationResult() { Status = Statuses.Error, Message = "В базе уже существует актор с таким именем!" });
            }
            else
            {
                actorId = _storage.Add(actor);
                if (actorId != -1)
                    result = Json(new OperationResult() { Status = Statuses.Ok, Data = actorId, Message = "Новый актор успешно жобавлен." });
            }
            return result;
        }

        public IActionResult Error()
        {
            return View(/*new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier }*/);
        }

        public XToolUser CurrentUser
        {
            get
            {
                var getUserTask = _userManager.GetUserAsync(User);
                getUserTask.Wait();
                return getUserTask.Result;
            }
        }

        #region AJAX actions

        public async Task<IActionResult> Comment(int id, string comment)
        {
            IActionResult result = null;
            try
            {
                Evaluation evaluation = _storage.GetAll<Evaluation>().FirstOrDefault(e => e.ActorId == id && e.ExpertId == CurrentUser.Id);
                if (evaluation != null)
                {
                    evaluation.Comment = comment;
                    _storage.Update(evaluation.Id, evaluation);
                }
                else
                {
                    _storage.Add(new Evaluation() { ActorId = id, Expert = await _userManager.GetUserAsync(User), Scales = new Scales() });
                }
                result = Json(new OperationResult() { Status = Statuses.Ok, Message = "Комментарий успешно сохранён", Data = evaluation.Id });
            }
            catch (Exception e)
            {
                result = Json(new OperationResult() { Status = Statuses.Error, Message = "Произошла ошибка при сохранении комментария" });
            }
            return result;
        }

        Scales EvaluationScales(Evaluation evaluation) => (_storage.Context as XToolDbContext).Scales.Single(s => s.Id == evaluation.ScalesId);

        public IActionResult Scales(int id, Scales newScales)
        {
            newScales.Id = default(int);
            OperationResult result = null;
            try
            {

                Evaluation evaluation = _storage.GetAll<Evaluation>().FirstOrDefault(e => e.ActorId == id && CurrentUser.Id == e.ExpertId);
                if (evaluation != null)
                {
                    _storage.Update(EvaluationScales(evaluation).Id, newScales);
                    result = new OperationResult() { Status = Statuses.Ok, Message = "Экспертная оценка успешно обновлена" };
                }
                else
                {
                    _storage.Add(new Evaluation() { ExpertId = CurrentUser.Id, Scales = newScales });
                    result = new OperationResult() { Status = Statuses.Ok, Message = "Экспертная оценка успешно добавлена" };
                }
            }
            catch (Exception e)
            {
                result = new OperationResult() { Status = Statuses.Error, Message = "Произошла ошибка при обновлении экспертной оценки!" };
            }
            return Json(result);
        }

        #endregion
    }
}
