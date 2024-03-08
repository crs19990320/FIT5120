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

        public ActionResult InvalidCityAction()
        {
            return View();
        }

        public ActionResult MoreInfo()
        {
            ViewBag.Message = "The second page.";

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
