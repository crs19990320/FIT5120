using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;

namespace Onboarding.Controllers
{
    public class RealTimeLocation : System.Web.UI.Page
    {
        private double lat;
        private double lon;

        public RealTimeLocation() { }

        public double getLat() { return lat; }
        public double getLon() { return lon; }

        public void setLat(double lat) {  this.lat = lat; }
        public void setLon(double lon) {  this.lon = lon; }

        // Default the location of Sydney.
        public void setDefaultLocation() 
        { 
            setLat(-34.04);
            setLon(151.1);   
        }

        private static string getIp()
        {
            if (System.Web.HttpContext.Current.Request.ServerVariables["HTTP_VIA"] != null)
                return System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].Split(new char[] { ',' })[0];
            else
                return System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
        }

        public String showIP() { 
            return getIp();
        }

        public void turnIP2Geo (String ip) 
        {
            setDefaultLocation();
        }
    }
}