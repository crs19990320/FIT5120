using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace Onboarding.Controllers
{
    public class RealTimeLocation 
    {
        public double latitude { get; set; }
        public double longitude { get; set; }

        public RealTimeLocation() { }

        public double getLat() { return latitude; }
        public double getLon() { return longitude; }

        public void setLat(double lat) {  this.latitude = lat; }
        public void setLon(double lon) {  this.longitude = lon; }

        // Default the location of Sydney.
        public void setDefaultLocation() 
        { 
            setLat(-34.04);
            setLon(151.1);   
        }



    }
}