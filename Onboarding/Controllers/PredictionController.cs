﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Onboarding.Controllers
{
    /*
     * This is a class to take the value from a model.
     * Version: 0.1
     * Author: Ruosong Chen
     */
    public class PredictionController
    {
        // This is the uv index.
        private double predictionNumber;

        /*
         * This is the default constructor function
         */
        public PredictionController() { }

        /*
         * Get function for get the number.
         */
        public double getPredictionNumber() {
            return predictionNumber;
        }

        /*
         * Set function.
         */
        public void setPredictionNumber(double predictionNumber)
        {
            this.predictionNumber = predictionNumber;
        }

        public void modelPresiction() { 
            return;
        }


    }
}