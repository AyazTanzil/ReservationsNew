using Reservations.Models;
using Reservations.Models.C1;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Reservations.Controllers
{
    public class C1Controller : Controller
    {
        DataBaseManager __dbc = null;
        [HttpPost]
        public ActionResult Index(FormCollection parameters)
        {
            List<GenericModel> paramsList = new List<GenericModel>();
            __dbc = new DataBaseManager();
            paramsList.Add(new GenericModel { Name = "StartDate", Value = parameters["StartDate"].ToString() });
            paramsList.Add(new GenericModel { Name = "EndDate", Value = parameters["EndDate"].ToString() });
            paramsList.Add(new GenericModel { Name = "FilterEntityName", Value = parameters["FilterEntityName"].ToString() });
            paramsList.Add(new GenericModel { Name = "FilterId", Value = parameters["FilterId"].ToString() });
            paramsList.Add(new GenericModel { Name = "CultureCode", Value = Thread.CurrentThread.CurrentCulture.Name });
            return View( __dbc.ExecuteQueryCommand(paramsList, "Search_GrandSearch1"));
        }

    }
}