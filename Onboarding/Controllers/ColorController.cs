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
            return GetGradientColor(0, 10, uvIndex);
        }

        /*
         * This function is a function to calculate color String based on the level of uvIndex.
         * Accept: int value for min value(usually 0), int value for max value(usuall less than 20), double uv index.
         * Return: A String of HTML color code.
         */
        private String GetGradientColor(int minValue, int maxValue, double currentValue)
        {
            int green = 0;
            int red = 0;
            int blue = 0;
            if (currentValue <= maxValue)
            {
                double normalizedValue = (double)(currentValue - minValue) / (maxValue - minValue);

                if (normalizedValue <= 0.5)
                {
                    green = 255;
                    red = (int)(255 * 2 * normalizedValue);
                }
                else
                {
                    red = 255;
                    green = (int)(255 * 2 * (1 - normalizedValue));
                }



            }
            else {
                green = 0;
                red = 255;
                blue = 255;

            }
            String greenString = green.ToString("X2");
            String redString = red.ToString("X2");
            String blueString = blue.ToString("X2");
            String colorString = "#" + redString + greenString + blueString;
            return colorString;
        }
    }
}