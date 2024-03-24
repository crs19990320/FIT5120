using MainProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MainProject.Controllers
{
    public class HomeController : Controller
    {
        private Database1Entities db = new Database1Entities();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View(db.QuestionTable1.ToList());
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}