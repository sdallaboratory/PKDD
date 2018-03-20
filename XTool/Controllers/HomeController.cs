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

namespace XTool.Controllers
{
    [Authorize]
    //[Route("[action]")]
    public class HomeController : Controller
    {
        private readonly IStorage<int> _storage;

        public HomeController(IStorage<int> storage) // тут поставить Сторадж
        {
            _storage = storage;
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

        public IActionResult Actor(int id)
        {
            IActionResult result = View();
            var actor = _storage.Get<Actor>(id);
            if(actor != null)
                LoadActor(actor);
            ViewBag.Actor = actor;
            if (!User.IsInRole("expert"))
                result = View("TechnologistActor");
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

        public IActionResult Error()
        {
            return View(/*new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier }*/);
        }
    }
}
