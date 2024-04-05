using MainProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Google.Cloud.Storage.V1;
using CsvHelper;
using System.IO;
using System.Globalization;

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
            // set Google Cloud
            var relativePath = "~/App_Data/my-first-project-381923-ee56fd884a5b.json";
            var absolutePath = Server.MapPath(relativePath);
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", absolutePath);

            var storage = StorageClient.Create();

            string bucketName = "climate_bucket_test1";
            string objectName = "climate_test.csv";

            var records = new List<Climate>();

            using (var stream = new MemoryStream())
            {
                storage.DownloadObject(bucketName, objectName, stream);

                stream.Position = 0;

                using (var reader = new StreamReader(stream))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    csv.Read();
                    csv.ReadHeader();
                    while (csv.Read())
                    {
                        var record = new Climate
                        {
                            state = csv.GetField<string>("state"),
                            state_lat = csv.GetField<double>("state_lat"),
                            state_long = csv.GetField<double>("state_long"),
                            temp_change = csv.GetField<double>("temp_change"),
                            avr_rainfall = csv.GetField<double>("avr_rainfall")
                        };
                        records.Add(record);
                    }
                }
            }
            return View(records);
        }


        //public ActionResult GetQuestionData()
        //    {
        //        var questionData = db.QuestionTable1.ToList(); // Get QuestionTable Data
        //        return Json(questionData, JsonRequestBehavior.AllowGet);
        //    }

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

        public ActionResult Map() { return View();}
    }
}