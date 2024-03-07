using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Onboarding.Controllers
{
    public class WeatherController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public async Task<JsonResult> GetWeather(string city)
        {
            string apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=-37.8136&lon=144.9631&exclude=current&appid=d2dba7f53adbb152167188a597023027";
            // latitude and longitude values of Melbourne

            // Use HttpClient to send GET request to OpenWeatherMap API
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    // Parse response content to get weather data
                    var weatherData = await response.Content.ReadAsStringAsync();

                    // Return weather data as JSON to the client
                    return Json(weatherData, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    // Return error message if request fails
                    return Json("Failed to retrieve weather data.");
                }
            }
        }
    }
}
