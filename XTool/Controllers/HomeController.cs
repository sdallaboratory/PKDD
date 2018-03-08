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

namespace XTool.Controllers
{
    [Authorize]
    //[Route("[action]")]
    public class HomeController : Controller
    {
        private readonly XToolEntityStorage _storage;

        public HomeController(XToolEntityStorage storage) // тут поставить Сторадж
        {
            _storage = storage;
        }

        public IActionResult Actors()
        {
            ViewBag.Actors = _storage.GetAll<Actor>().Take(3);
            return View();
        }

        public IActionResult Actor(int id)
        {
            ViewBag.Actor = _storage.Get<Actor>(id);
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return Json("asd");
            //return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
