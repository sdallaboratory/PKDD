using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pkdd.Models.Common;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Pkdd.Controllers.Base
{
    public abstract class PkddControllerBase : Controller
    {
        protected JsonResult PkddOk(object data = null, string type = null)
        {
            HttpContext.Response.StatusCode = 200;
            //HttpContext.Response.Headers.Add("Date", DateTime.Now.ToString());
            return Json(data);
        }

        protected JsonResult PkddError(string message)
        {
            HttpContext.Response.StatusCode = 500;
            return Json($"{message}");
        }
    }
}
