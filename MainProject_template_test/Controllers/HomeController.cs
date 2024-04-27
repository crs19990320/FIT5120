﻿using MainProject_template_test.Models;
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
    }
}