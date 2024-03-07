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
        public ActionResult Index()

        {
            PredictionController predictionController = new PredictionController();
            double numberComesFromPrediction = predictionController.getPredictionNumber();
            ColorController colorController = new ColorController();
            String decidedColor = colorController.DecideTheColor(numberComesFromPrediction);
            ViewBag.Message = numberComesFromPrediction.ToString();
            ViewBag.Color = decidedColor;

            // print the corresponding tips message based on the prediction number
            TipsController tipController = new TipsController();
            double message = predictionController.getPredictionNumber();
            ViewBag.Tips = tipController.getTipsBasedOnUVIndex(message);
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

        [HttpPost]
        public ActionResult GetUserLocation(RealTimeLocation location)
        {
            //Debug.WriteLine($"{location.latitude},     {location.longitude}");
            if (location.latitude == -999 && location.longitude == -999)
            {
                location.setDefaultLocation();
            }
            //Debug.WriteLine($"{location.latitude},     {location.longitude}");
            return Json(new { success = true });

        }


    }
}
