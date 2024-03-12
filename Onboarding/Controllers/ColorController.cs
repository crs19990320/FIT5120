using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Diagnostics;
using System.Drawing.Printing;

namespace Onboarding.Controllers
{
    /*
     * This is the Class control the color of the UV index.
     * Version: 0.4
     * Author: Ruosong Chen
     */
    public class ColorController
    {
        /*
         * This is the default constructor function.
         */
        public ColorController() { }

        /*
         * This function is a function return a String of HTML color code.
         * Accept: A double number uvIndex.
         * Return: A String of HTML color code.
         */
        public String DecideTheColor(double uvIndex)
        {
            return GetGradientColor(uvIndex);
        }

        /*
         * This function is a function to calculate color String based on the level of uvIndex.
         * Accept: int value for min value(usually 0), int value for max value(usuall less than 20), double uv index.
         * Return: A String of HTML color code.
         */
        private String GetGradientColor(double currentValue)
        {
            String colorString = "default";
            if (currentValue < 3 && currentValue >= 0 )
             {
                colorString = "#A5B592";
            }
            else if (currentValue <6 && currentValue >=3 )
            {
                colorString = "#F1D77F";
            }
            else if (currentValue < 8 && currentValue >= 6)
            {
                colorString = "#F3A447";
            }
            else if (currentValue < 10 && currentValue >= 8)
            {
                colorString = "#E26966";
            }else if(currentValue >= 11)
            {
                colorString = "#B55475";
            }

            return colorString;
        }
    }
}