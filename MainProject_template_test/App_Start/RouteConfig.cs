using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MainProject_template_test
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
<<<<<<< HEAD
                defaults: new { controller = "Home", action = "HomePage", id = UrlParameter.Optional }
=======
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
>>>>>>> 7b1aa10c07feb9aacaa0022fcf2e6642d2c4d6f5
            );
        }
    }
}
