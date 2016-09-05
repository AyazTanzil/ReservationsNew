using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Reservations.Models.C1
{
    public class Property
    {
        public int RowIndex { get; set; }
        public string BranchCode { get; set; }
        public int PropertyID { get; set; }
        public string PostalAddress { get; set; }
        public string Map { get; set; }
        public string PropertyName { get; set; }
        public string PropertyDescription { get; set; }
        public string RegionName { get; set; }
        public string CityName { get; set; }
        public string CountryName { get; set; }
        public string DBCode { get; set; }
        public int StarsId { get; set; }
        public string StarsName { get; set; }
        public int MainPicture { get; set; }
    }
}