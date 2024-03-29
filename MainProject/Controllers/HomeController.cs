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

        /*
         * This method returns the Landing Page view.
         */
        public ActionResult LandingPage()
        {
            return View();
        }

        public ActionResult WelcomePage() { return View(); }

        public ActionResult Information() { return View();}
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View(db.QuestionTable1.ToList());
        }

        public ActionResult GetQuestionData()
        {
            var questionData = db.QuestionTable1.ToList(); // Get QuestionTable Data
            return Json(questionData, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Test()
        {
            return View();
        }
        public ActionResult D3test()
        {
            return View();
        }
        public ActionResult cardGame()
        {
            return View();
        }
    }
}