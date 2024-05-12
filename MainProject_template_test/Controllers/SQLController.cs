using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using MainProject_template_test.Models;
using Newtonsoft.Json.Linq;
using static Google.Apis.Storage.v1.StorageService;

namespace MainProject_template_test.Controllers
{

    public class SQLController : Controller
    {
        private MainprojectTP28Entities1 db = new MainprojectTP28Entities1();

        public ActionResult testTable()
        {
            var logins = db.testTable.ToList();
            return View(logins);
        }

        public int GetUserTableRowCount()
        {
            int rowCount = db.userTable.Count();
            return rowCount;
        }

        public void InsertUser(int id, string username)
        {
            var user = new userTable();
            user.ID = GetUserTableRowCount() + 1;
            user.USERNAME = username;

            db.userTable.Add(user);
            db.SaveChanges();
        }

        public userTable LoginUser(string username)
        {
            var user = db.userTable.FirstOrDefault(u => u.USERNAME == username);
            return user;
        }

        public void UpdateTaskStatus(string username, string VIDEOTASK, string CTASK1, string CTASK2, string CTASK3, string CTASK4, string CTASK5, string CTASK6)
        {
            var user = db.userTable.FirstOrDefault(u => u.USERNAME == username);
            if (user != null)
            {
                user.VIDEOTASK = VIDEOTASK;
                user.CTASK1 = CTASK1;
                user.CTASK2 = CTASK2;
                user.CTASK3 = CTASK3;
                user.CTASK4 = CTASK4;
                user.CTASK5 = CTASK5;
                user.CTASK6 = CTASK6;

                db.SaveChanges();
            }

        }

        public List<string> GetAllUsernames()
        {
            var usernames = db.userTable.Select(u => u.USERNAME).ToList();

            return usernames;
        }
        public bool checkID(string idnumber)
        {
            List<string> usernames = GetAllUsernames();
            foreach (string username in usernames)
            {
                string id = username.Split('#')[1];
                if (id == idnumber)
                {
                    return false;
                }
            }
            return true;
        }

        private string GetColumnValue(userTable user, string columnName)
        {
            switch (columnName)
            {
                case "VIDEOTASK":
                    return user.VIDEOTASK;
                case "CTASK1":
                    return user.CTASK1;
                case "CTASK2":
                    return user.CTASK2;
                case "CTASK3":
                    return user.CTASK3;
                case "CTASK4":
                    return user.CTASK4;
                case "CTASK5":
                    return user.CTASK5;
                case "CTASK6":
                    return user.CTASK6;
                default:
                    return null;
            }
        }

        public int CountKeyValuePairs(string username, string columnName)
        {
            var user = db.userTable.FirstOrDefault(u => u.USERNAME == username);
            if (user != null)
            {
                var columnValueString = GetColumnValue(user, columnName);
                if (!string.IsNullOrEmpty(columnValueString) && columnValueString != "null")
                {
                    JObject jsonObject = JObject.Parse(columnValueString);
                    return jsonObject.Count;
                }
            }
            return 0;
        }
        public string CountTasks()
        {

                List<string> usernames = GetAllUsernames();
                JObject returnJson = new JObject();
                string result = "";
                int score = 0;
                foreach (string username in usernames)
                {
                    score += CountKeyValuePairs(username, "VIDEOTASK") * 750;
                    score += CountKeyValuePairs(username, "CTASK1") * 500;
                    score += CountKeyValuePairs(username, "CTASK2") * 500;
                    score += CountKeyValuePairs(username, "CTASK3") * 500;
                    score += CountKeyValuePairs(username, "CTASK4") * 500;
                    score += CountKeyValuePairs(username, "CTASK5") * 500;
                    score += CountKeyValuePairs(username, "CTASK6") * 500;
                    returnJson[username] = score;
                    Console.WriteLine($"User: {username}, Score: {score}");
                    score = 0;
                }
                result = returnJson.ToString();
                return result;
         
        }

    }
}