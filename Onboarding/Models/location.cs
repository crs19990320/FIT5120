//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Onboarding.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class location
    {
        public location()
        {
            this.melbourne_uvi = new HashSet<melbourne_uvi>();
            this.cancer_by_state_stats = new HashSet<cancer_by_state_stats>();
        }
    
        public int loc_id { get; set; }
        public string postcode { get; set; }
        public string suburb { get; set; }
        public string state { get; set; }
        public Nullable<float> latitude { get; set; }
        public Nullable<float> longitude { get; set; }
    
        public virtual ICollection<melbourne_uvi> melbourne_uvi { get; set; }
        public virtual ICollection<cancer_by_state_stats> cancer_by_state_stats { get; set; }
    }
}