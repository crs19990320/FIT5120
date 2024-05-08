using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using MainProject_template_test.Models;

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
            user.ID = id;
            user.USERNAME = username;

            db.userTable.Add(user);
            db.SaveChanges(); 
        }

        public userTable LoginUser(string username)
        {
            var user = db.userTable.FirstOrDefault(u => u.USERNAME == username);
            return user;
        }
    }

    
}