using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Reservations.Models
{
    public class GenericModel
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
    public class DataModel
    {
        public List<GenericModel> paramsList { get; set; }
        public string ProcName { get; set; }
    }
}