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
            // set Google Cloud
            var relativePath = "~/App_Data/my-first-project-381923-316111010eb8.json";
            var absolutePath = Server.MapPath(relativePath);
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", absolutePath);

            var storage = StorageClient.Create();

            string bucketName = "climate_bucket_test1";
            string objectName = "dbo.QuestionTable.csv";

            var records = new List<QuestionTable>();

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
                        var record = new QuestionTable
                        {
                            Id = csv.GetField<int>("Id"),
                            Questions = csv.GetField<string>("Questions"),
                            Answer1 = csv.GetField<string>("Answer1"),
                            Answer2 = csv.GetField<string>("Answer2"),
                            A1Carbon = csv.GetField<int>("A1Carbon"),
                            A1Water = csv.GetField<int>("A1Water"),
                            A1EcoLife = csv.GetField<int>("A1EcoLife"),
                            A2Carbon = csv.GetField<int>("A2Carbon"),
                            A2Water = csv.GetField<int>("A2Water"),
                            A2EcoLife = csv.GetField<int>("A2EcoLife"),
                        };
                        records.Add(record);
                    }
                }
            }
            return View(records);
        }

        public ActionResult About()
        {
            // set Google Cloud
            var relativePath = "~/App_Data/my-first-project-381923-316111010eb8.json";
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
            // set Google Cloud
            var relativePath = "~/App_Data/my-first-project-381923-316111010eb8.json";
            var absolutePath = Server.MapPath(relativePath);
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", absolutePath);

            var storage = StorageClient.Create();

            string bucketName = "climate_bucket_test1";
            string objectName = "dbo.QuestionTable.csv";

            var records = new List<QuestionTable>();

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
                        var record = new QuestionTable
                        {
                            Id = csv.GetField<int>("Id"),
                            Questions = csv.GetField<string>("Questions"),
                            Answer1 = csv.GetField<string>("Answer1"),
                            Answer2 = csv.GetField<string>("Answer2"),
                            A1Carbon = csv.GetField<int>("A1Carbon"),
                            A1Water = csv.GetField<int>("A1Water"),
                            A1EcoLife = csv.GetField<int>("A1EcoLife"),
                            A2Carbon = csv.GetField<int>("A2Carbon"),
                            A2Water = csv.GetField<int>("A2Water"),
                            A2EcoLife = csv.GetField<int>("A2EcoLife"),
                        };
                        records.Add(record);
                    }
                }
            }
            return View(records);
        }

        public ActionResult Map() { return View();}
    }
}