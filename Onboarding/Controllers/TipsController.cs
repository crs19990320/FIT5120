using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Onboarding.Controllers
{
    public class TipsController
    {
        public TipsController() { }

        public String getTipsBasedOnUVIndex(double uvIndex)
        {
            String tips = "";
            if (uvIndex >= 0 && uvIndex < 3)
            {
                tips = "Go out to have some FUN!!";
            }
            else if (uvIndex >= 3 && uvIndex < 6)
            {
                tips = "Go out to have some FUN!! \n But remember to do some protection!!!!!!!";
            }
            else if (uvIndex >= 6 && uvIndex < 8)
            {
                tips = "Go out to have some FUN!! \n But remember to do a lot of protection!!!!!!!";
            }
            else if (uvIndex >= 8 && uvIndex < 12)
            {
                tips = "I strongly suggest use all sunscreen you have.";
            }
            else if (uvIndex >= 12)
            {
                tips = "Truman went out and gained real life and freedom, but if you go out now, you will die in peace. DONT GO OUT!!!!!";
            }
            return tips;
        }
    }
}