namespace MainProject_template_test.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    //public class Rectangle
    //{
    //    public int X { get; set; }
    //    public int Y { get; set; }
    //    public int Width { get; set; }
    //    public int Height { get; set; }
    //}

    public class Difference
    {
        public string Image1Path { get; set; }
        public string Image2Path { get; set; }
        public List<Rectangle> Differences { get; set; }
    }
}
