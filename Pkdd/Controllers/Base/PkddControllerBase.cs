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
            return Json(new PkddResponse(data, type, true));
        }

        protected JsonResult PkddWarning(object data = null, string type = null, string message = null)
        {
            HttpContext.Response.StatusCode = 200;
            return Json(new PkddResponse(data, type, false, message));
        }

        protected JsonResult PkddError(string message)
        {
            HttpContext.Response.StatusCode = 500;
            return Json(new PkddResponse(null, null, false, $"Error: \"{message}\""));
        }
    }
}
