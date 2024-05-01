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
    }
}