using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Onboarding.Controllers
{
    /*
     * This is the Class control all the basic logics in Homepage.
     * Version: 0.4
     * Author: Ruosong Chen, Qihang Wang
     */
    public class HomeController : Controller
    {
        /*
         * This is the declaration of private fields initializing controller objects.
         */
        private PredictionController predictionController = new PredictionController();
        private ColorController colorController = new ColorController();
        private TipsController tipController = new TipsController();

        /*
         * This method returns the Welcome Page view.
         */
        public ActionResult WelcomePage()
        {
            return View();
        }

        /*
         * This method receives the user's location information and sets the prediction number based on UV index.
         */
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

        /*
         * This method returns the Index view, along with prediction number, color, and tips based on UV index.
         */
        public ActionResult Index()
        {
            double numberComesFromPrediction = (double)(Session["PredictionNumber"] ?? 0);
            String decidedColor = colorController.DecideTheColor(numberComesFromPrediction);
            ViewBag.Message = numberComesFromPrediction.ToString();
            ViewBag.Color = decidedColor;

            ViewBag.Tips = tipController.getTipsBasedOnUVIndex(numberComesFromPrediction);

            return View();
        }

        //public ActionResult About()
        //{
        //    ViewBag.Message = "Your application description page.";

        //    return View();
        //}

        //public ActionResult Contact()
        //{
        //    ViewBag.Message = "your contact page.";

        //    return View();
        //}


        /*
         * This method receives the selected city from the user and redirects to the corresponding city page.
         */
        [HttpPost]
        public ActionResult Contact(string selectedCity)
        {
            if (selectedCity == "1")
            {
                return RedirectToAction("Sydney", "Contact");
            }
            if (selectedCity == "2")
            {
                return RedirectToAction("Melbourne", "Contact");
            }
            else if (selectedCity == "3")
            {
                return RedirectToAction("Canberra", "Contact");
            }
            else if (selectedCity == "4")
            {
                return RedirectToAction("Perth", "Contact");
            }
            else if (selectedCity == "5")
            {
                return RedirectToAction("Brisbane", "Contact");
            }
            else
            {
                return RedirectToAction("InvalidCityAction", "Contact");
            }
        }

        /*
         * Below are methods for each city page.
         */
        public ActionResult Sydney()
        {
            return View();
        }

        public ActionResult Melbourne()
        {
            return View();
        }

        public ActionResult Canberra()
        {
            return View();
        }

        public ActionResult Perth()
        {
            return View();
        }
        public ActionResult Brisbane()
        {
            return View();
        }

        /*
         * This method returns the Invalid City Action view.
         */
        public ActionResult InvalidCityAction()
        {
            return View();
        }

        /*
         * This method returns the More Info view, along with activity tips based on UV index.
         */
        public ActionResult MoreInfo()
        {
            double numberComesFromPrediction = (double)(Session["PredictionNumber"] ?? 0);
            TipsController tipsController = new TipsController();
            String actTips = tipsController.getActivitiesTipsBasedOnUVIndex(numberComesFromPrediction);
            ViewBag.actTips = actTips;
            return View();
        }

        /*
         * This method returns the Calculator page view.
         */
        public ActionResult Calculator()
        {
            return View();
        }

        /*
         * This method returns the Articles page view.
         */
        public ActionResult Articles()
        {
            return View();
        }

        public ActionResult Link()
        {
            return View();
        }

        /* // for testing purpose
         [HttpPost]
         public async Task<ActionResult> GetWeatherData(double latitude, double longitude)
         {
             var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=-34.60333&lon=-58.38167&exclude=hourly,daily&appid=d2dba7f53adbb152167188a597023027";

             using (var httpClient = new HttpClient())
             {
                 HttpResponseMessage response = await httpClient.GetAsync(apiUrl);

                 if (response.IsSuccessStatusCode)
                 {
                     string apiResponse = await response.Content.ReadAsStringAsync();

                     var weatherData = JsonConvert.DeserializeObject<WeatherData>(apiResponse);

                     return PartialView("WeatherPartial", weatherData);
                 }
                 else
                 {
                     ViewBag.ErrorMessage = "Failed to fetch weather data.";
                     return PartialView("ErrorPartial");
                 }
             }
         }
     }

     // the schema of the data
     public class WeatherData
     {
         public string Description { get; set; }
         public double Temperature { get; set; }
     }*/

    }
}
