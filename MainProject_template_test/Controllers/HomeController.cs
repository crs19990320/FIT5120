using MainProject_template_test.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Google.Cloud.Storage.V1;
using CsvHelper;

namespace MainProject_template_test.Controllers
{
    public class HomeController : Controller
    {
        private Database1Entities db = new Database1Entities();
        public ActionResult CardGame()
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
        public ActionResult LearnPage()
        {
            return View();
        }

        public ActionResult Dashboard()
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

        public ActionResult HomePage()
        {
            return View();
        }

        public ActionResult Parents()
        {
            return View();
        }

        public ActionResult Puzzle()
        {
            return View();
        }

        public ActionResult Map()
        {

            var relativePath = "~/App_Data/my-first-project-381923-316111010eb8.json";
            var absolutePath = Server.MapPath(relativePath);
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", absolutePath);

            var storage = StorageClient.Create();

            string bucketName = "climate_bucket_test1";
            string objectName = "map_current_new.csv";

            var records = new List<CurrentNewMap>();

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
                        var record = new CurrentNewMap
                        {
                            state = csv.GetField<string>("state"),
                            state_lat = csv.GetField<double>("state_lat"),
                            state_long = csv.GetField<double>("state_long"),
                            Temperature = csv.GetField<int>("Temperature"),
                            net_emissions = csv.GetField<int>("net_emissions"),
                            rainfall_percentage = csv.GetField<int>("rainfall_percentage"),
                            total_water_use = csv.GetField<int>("total_water_use"),
                            total_water_consumption = csv.GetField<int>("total_water_consumption")
                        };
                        records.Add(record);
                    }
                }
            }
            return View(records);

        }

        public ActionResult pageNotFound()
        {
            Response.StatusCode = 404; // Set HTTP status code to 404
            return View(); // Return your 404 error view
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult register()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Register()
        {
            SQLController sqlController = new SQLController();
            int userTableRowCount = sqlController.GetUserTableRowCount();

            return Json(new { success = true, message = "Registration successful", userTableRowCount = userTableRowCount });
        }

        [HttpPost]
        public JsonResult RecordRegister(int id, string UserName)
        {
            SQLController sqlController = new SQLController();
            sqlController.InsertUser(id,UserName);

            return Json(new { success = true, message = "Registration successful"});
        }

        [HttpPost]
        public JsonResult LoginCheck(string userName)
        {
            SQLController sqlController = new SQLController();
            userTable user = sqlController.LoginUser(userName);
            if (user != null)
            {
                return Json(new
                {
                    success = true,
                    message = "Login successful",
                    data = new
                    {
                        USERNAME = userName,
                        VIDEOTASK=user.VIDEOTASK,
                        CTASK1= user.CTASK1,
                        CTASK2 = user.CTASK2,
                        CTASK3 = user.CTASK3,
                        CTASK4 = user.CTASK4,
                        CTASK5 = user.CTASK5,
                        CTASK6 = user.CTASK6
                    }
                });
            }
            else
            {
                return Json(new
                {
                    success = false,
                    message = "Login Faile",
                   
                });
            }

            
        }

        [HttpPost]
        public JsonResult updateTaskStatus(string username, string VIDEOTASK, string CTASK1, string CTASK2, string CTASK3, string CTASK4, string CTASK5, string CTASK6)
        {
            SQLController sqlController = new SQLController();
            sqlController.UpdateTaskStatus(username, VIDEOTASK, CTASK1, CTASK2, CTASK3, CTASK4, CTASK5, CTASK6);
            
                return Json(new
                {
                    success = true,
                    message = "uploaded",

                });


        }

        public ActionResult indexBaker()
        {
            return View();
        }

    }
}