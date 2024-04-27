using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MainProject_template_test.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Error/PageNotFound

        public ActionResult PageNotFound()
        {
            Response.StatusCode = 404; // Set HTTP status code to 404
            return View("pageNotFound"); // Return your 404 error view
        }

        //public ActionResult pageNotFound()
        //{ return View(); }
    }
}