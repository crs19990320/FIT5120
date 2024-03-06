﻿using Microsoft.Ajax.Utilities;
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
            float numberComesFromPrediction = predictionController.getPredictionNumber();
            ColorController colorController = new ColorController();
            String decidedColor = colorController.DecideTheColor(numberComesFromPrediction);
            ViewBag.Message = numberComesFromPrediction.ToString();
            ViewBag.Color = decidedColor;
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
        public ActionResult GetUserLocation(RealTimeLocation location)
        {
            if (location.latitude == -999 && location.longitude == -999)
            {
                location.setDefaultLocation();
            }
            else { 
                location.setLat(location.latitude);
                location.setLon(location.longitude);
            }
            return Json(new { success = true });

        }
    }
}
