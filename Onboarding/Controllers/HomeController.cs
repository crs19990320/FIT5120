using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Onboarding.Controllers
{
    public class HomeController : Controller
    {
        private PredictionController predictionController = new PredictionController();
        private ColorController colorController = new ColorController();
        private TipsController tipController = new TipsController();

        public ActionResult WelcomePage()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetUserLocation(RealTimeLocation location)
        {
            if (location.latitude == -999 && location.longitude == -999)
            {
                location.setDefaultLocation();
            }
            predictionController.setPredictionNumber(location.uvindex);
            Session["PredictionNumber"] = predictionController.getPredictionNumber();
            return Json(new { success = true });
        }

        public ActionResult Index()
        {
            double numberComesFromPrediction = (double)(Session["PredictionNumber"] ?? 0);
            String decidedColor = colorController.DecideTheColor(numberComesFromPrediction);
            ViewBag.Message = numberComesFromPrediction.ToString();
            ViewBag.Color = decidedColor;

            ViewBag.Tips = tipController.getTipsBasedOnUVIndex(numberComesFromPrediction);

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public ActionResult Contact(string selectedCity)
        {
            if (selectedCity == "1")
            {
                return RedirectToAction("Melbourne", "Contact");
            }
            else if (selectedCity == "2")
            {
                return RedirectToAction("Sydney", "Contact");
            }
            else if (selectedCity == "3")
            {
                return RedirectToAction("Perth", "Contact");
            }
            else
            {
                return RedirectToAction("InvalidCityAction", "Contact");
            }
        }

        public ActionResult Melbourne()
        {
            return View();
        }

        public ActionResult Sydney()
        {
            return View();
        }

        public ActionResult Perth()
        {
            return View();
        }

        public ActionResult InvalidCityAction()
        {
            return View();
        }

        public ActionResult MoreInfo()
        {
            ViewBag.Message = "The second page.";

            return View();
        }

        


    }
}
