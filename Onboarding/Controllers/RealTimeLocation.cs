using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace Onboarding.Controllers
{

    /*
     * This is class for decide the location for a user.
     * Version: 0.1
     * Author: Ruosong Chen
     */
    public class RealTimeLocation 
    {
        public double latitude { get; set; }
        public double longitude { get; set; }
        public double uvindex { get; set; }

        /*
         * This is the constructor function.
         */
        public RealTimeLocation() { }
        

        /*
         * If the user don't want to share a location to us, use the default function.
         */
        public void setDefaultLocation() 
        {
            // Default the location of Melbourne.
            latitude = -37.8136;
            longitude = 144.9631;   
        }


    }
}