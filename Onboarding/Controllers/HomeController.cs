using System;
using System.Collections.Generic;
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
            float numberComesFromPrediction = predictionController.getPredictionNumber();
            ColorController colorController = new ColorController();
            String decidedColor = colorController.DecideTheColor(numberComesFromPrediction);
            RealTimeLocation location = new RealTimeLocation();
            String ip = location.showIP();
            ViewBag.Message = numberComesFromPrediction.ToString();
            ViewBag.Color = decidedColor;
            ViewBag.ip = ip;
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
        
    }
}