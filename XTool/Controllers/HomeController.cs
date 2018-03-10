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

namespace XTool.Controllers
{
    [Authorize]
    //[Route("[action]")]
    public class HomeController : Controller
    {
        private readonly IStorage<int> _storage;

        public HomeController(IStorage<int>storage) // тут поставить Сторадж
        {
            _storage = storage;
        }

        public IActionResult Actors()
        {
            ViewBag.Actors = _storage.GetAll<Actor>().Take(3); // тут отсортировать по релевантности перед Take
            return View();
        }

        public IActionResult Actor(int id)
        {
            
            var actor = _storage.Get<Actor>(id);
            foreach (var collection in _storage.Context.Entry(actor).Collections)
            {
                collection.Load();
            }
            foreach (var period in actor.CareerPeriods)
            {
                _storage.Context.Entry(period).Collection(p => p.CareerEvents).Load();
            }
            
            var Photos = actor.Photos;
            var Videos = actor.Videos;
            ViewBag.Actor = _storage.Get<Actor>(id);
            ViewBag.Count = _storage.Count<Actor>();
            return View();
        }

        public IActionResult Error()
        {
            return View(/*new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier }*/);
        }
    }
}
