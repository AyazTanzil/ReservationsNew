using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Reservations.Models;
using System.Data;

namespace Reservations.Controllers
{
    public class DataBaseController : ApiController
    {
        [HttpPost]
        public DataTable ExecuteQueryCommand([FromBody]DataModel data)
        {
            return null;
        }

        [HttpPost]
        public string ExecuteNonQueryCommand([FromBody]DataModel data)
        {
            return data.paramsList.Count.ToString();
        }
    }
}
