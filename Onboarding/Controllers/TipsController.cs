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
            String[] randomTips = randomlyGenTips(uvIndex);
            String tips = randomTips[0] + randomTips[1] + randomTips[2];
            return tips;
        }
        public String getActivitiesTipsBasedOnUVIndex(double uvIndex)
        {
            String[] randomTips = activitiesGenTips(uvIndex);
            String tips = randomTips[0] + randomTips[1] + randomTips[2];
            return tips;
        }

        public String[] randomlyGenTips(double uvIndex)
        {
            String[] lowLevelUV = { "● Accessorize with flair on low UV days. A chic hat and UV-filtering sunglasses keep you fashionable and protected, blending seamlessly with Melbourne’s eclectic style.\n",
                "● Transform sunscreen application into as much of a morning ritual as your first espresso. Even when UV levels dip, your skin's health doesn't take a day off.\n",
                "● The sun's taking it easy, so you can too. A light, breathable hat is perfect. It’s like wearing a bit of cool shade on your head!\n" ,
                "● Carry a travel-sized sunscreen in your bag so you’re always ready for the sun’s peek-a-boo!\n"};
            String[] medLevelUV = { "● Sunscreen is like a tram ticket – you might not think you need it, until you're caught out without it!\n",
                "● Hosting a barbie? Slap on some sunscreen before you slap the snags on the grill. Even with moderate UV, you don’t want to end up more grilled than your steaks!\n",
                "● Hitting the Beach? Don’t forget your sunnies and a hat. They're your best mates against the glare and sizzle.\n",
                "● Don’t forget your lips! A lip balm with SPF is perfect for keeping them safe and soft.\n"};
            String[] highLevelUV = { "● Choose SPF 50+ for strong protection and reapply often. Melbourne's sun can be deceptive, even on cooler days.\n",
                "● High UV means high risk. Keep hydrated and seek shade, especially during the scorching midday hours.\n",
                "● Zap! Boom! Every time we put on sunscreen, we're turning into Sun Safety Superheroes! Let’s apply sunscreen and wear some cool sunglasses before stepping out!\n",
                "● Sunscreen alone is not 100% protection against harsh UV rays. Always use hats, sunglasses, and coveralls to protect yourself.\n"};

            Random random = new Random();
            int randomNumber1 = random.Next(0, 4);
            int randomNumber2;
            int randomNumber3;
            do
            {
                randomNumber2 = random.Next(0, 4);
            }
            while (randomNumber1 == randomNumber2);
            do
            {
                randomNumber3 = random.Next(0, 4);
            }
            while (randomNumber1 == randomNumber2 || randomNumber1 == randomNumber3 || randomNumber2 == randomNumber3);

            String[] returnString = { };
            if (uvIndex < 3)
            {
                returnString = lowLevelUV;
            }
            else if (uvIndex >= 3 && uvIndex < 6)
            {
                returnString = medLevelUV;
            }
            else if (uvIndex >= 6)
            {
                returnString = highLevelUV;
            }

            return new String[] { returnString[randomNumber1], returnString[randomNumber2], returnString[randomNumber3] };
        }

        public String[] activitiesGenTips(double uvIndex)
        {
            String[] lowLevelUV = { "● Ideal for a chill riverside stroll as the evening unwinds – pure bliss on the banks!\n",
                "● Zoos, amusement parks, and parks truly come alive under the soft glow of low UV levels – the perfect backdrop for adventure without the sunburn!\n",
                "● Grab your pals and hit the trails to gulp down some fresh air – it's the ultimate recharge!\n" ,
                "● Enjoy lunch outside without the high-noon sun overhead. A perfect day for a picnic in the park or a bite at an outdoor café.\n",
                "● Tend to your garden without the heavy-duty sun gear. It’s a nice way to connect with nature and get a bit of Vitamin D, gently.\n",
                "● Today's the day to hit the beach – sun’s out, fun’s out, and the waves are calling your name!\n",
                "● This weather just begging for some gardening love. When's the last time your garden got a little tender Loving Care?\n"};
            String[] medLevelUV = { "● Mid-level UV calls for a treasure hunt in your local botanical garden – let those hidden gems shine!\n",
                "● It's scooter time! Glide through the streets when the sun plays nice – helmet on, spirits high.\n",
                "● How about a mural marathon? Discover the city's street art – every wall tells a story under the gentle sun.\n",
                "● Unleash your inner photographer – mid-UV lighting is pure magic for capturing those dreamy shots.\n",
                "● Perfect weather for a kite-flying contest – let’s see whose colors dance best in the sky’s mild embrace!\n",
                "● Roll out the yoga mat in the park – stretch and sun salute at the sweet spot of UV rays\n",
                "● Time for an outdoor book club session – discuss your latest read with toes tickled by the grass, under the kind-hearted sun.\n"};
            String[] highLevelUV = { "● Dive into the cool embrace of an indoor swimming pool – splash without the sunburn.\n",
                "● Hit the mall for a shopping spree – where the only thing high is the fashion, not the UV.\n",
                "● Explore the mysteries of a museum – culture and cool air, away from the sun's glare.\n",
                "● Movie marathon at home or in a cozy cinema – let the big screen light up your day.\n",
                "● Get crafty in a workshop – from pottery to painting, create away from the rays.\n",
                "● Indulge in a spa day – pampering in the shade, away from the UV parade.\n",
                "● Venture into the culinary world with a cooking class – whip up some deliciousness while the sun does its business outside.\n"};

            Random random = new Random();
            int randomNumber1 = random.Next(0, 7);
            int randomNumber2;
            int randomNumber3;
            do
            {
                randomNumber2 = random.Next(0, 7);
            }
            while (randomNumber1 == randomNumber2);
            do
            {
                randomNumber3 = random.Next(0, 7);
            }
            while (randomNumber1 == randomNumber2 || randomNumber1 == randomNumber3 || randomNumber2 == randomNumber3);

            String[] returnString = { };
            if (uvIndex < 3)
            {
                returnString = lowLevelUV;
            }
            else if (uvIndex >= 3 && uvIndex < 6)
            {
                returnString = medLevelUV;
            }
            else if (uvIndex >= 6)
            {
                returnString = highLevelUV;
            }

            return new String[] { returnString[randomNumber1], returnString[randomNumber2], returnString[randomNumber3] };
        }


    }
}