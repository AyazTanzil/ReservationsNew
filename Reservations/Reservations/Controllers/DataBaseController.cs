using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Reservations.Models;

namespace Reservations.Controllers
{
    public class DataBaseController : ApiController
    {
        // GET: api/DataBase
        public string GET(GenericModel[] data)
        {
            return "data";
        }

        // POST: api/DataBase
        [HttpPost]
        public string Post([FromBody]List<GenericModel> data)
        {
            return data.Count.ToString();
        }

        // PUT: api/DataBase/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DataBase/5
        public void Delete(int id)
        {
        }
    }
}
