using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MainProject.Models;

namespace MainProject.Controllers
{
    public class QuestionsAPIController : Controller
    {
        private Database1Entities db = new Database1Entities();

        // GET: QuestionsAPI
        public ActionResult Index()
        {
            var questions = db.QuestionTable1.ToList();
            return View(questions);
        }

        [HttpGet]
        public ActionResult GetRandomData()
        {

            var randomData = db.QuestionTable1 
                                .OrderBy(r => Guid.NewGuid())
                                .Take(10) 
                                .ToList();
            var response = new { questions = randomData };


            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
