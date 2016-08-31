using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Reservations.Models;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Configuration;

namespace Reservations.Controllers
{
    public class DataBaseController : ApiController
    {   DataBaseManager __dbc = null;
        [HttpPost]
        public DataTable ExecuteQueryCommand([FromBody]DataModel data)
        {
            __dbc = new DataBaseManager();
            return __dbc.ExecuteQueryCommand(data.paramsList, data.ProcName);
        }

        [HttpPost]
        public string ExecuteNonQueryCommand([FromBody]DataModel data)
        {
            __dbc = new DataBaseManager();
            return __dbc.ExecuteNonQueryCommand(data.paramsList,data.ProcName);
        }
    }
}

public class DataBaseManager
{
    protected static string ConnectionString
    {
        get
        {
            ConnectionStringSettings s = ConfigurationManager.ConnectionStrings["EgressReservationsDBCNN"];
            return s.ConnectionString;
        }
    }
    public DataTable ExecuteQueryCommand(List<GenericModel> parameters, string procName)
    {
        DataTable dt; ;
        using (var con = new SqlConnection(ConnectionString))
        {
            using (SqlCommand cmd = new SqlCommand(procName, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                foreach (GenericModel param in parameters)
                {
                    cmd.Parameters.AddWithValue("@" + param.Name, param.Value);
                }
                con.Open();
                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    dt = new DataTable();
                    dt.Load(dr);
                }
            }
        }
        return dt;
    }
    public String ExecuteNonQueryCommand(List<GenericModel> parameters, string procName)
    {
        var RowsAffected = string.Empty;
        try
        {
            using (var con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(procName, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    foreach (GenericModel param in parameters)
                    {
                        cmd.Parameters.AddWithValue("@" + param.Name, param.Value);
                    }
                    con.Open();
                    RowsAffected = cmd.ExecuteNonQuery() > 0 ? "1" : "0";
                    con.Close();
                }
            }
        }
        catch (Exception ex)
        {
            RowsAffected = ex.Message;
        }
        return RowsAffected;
    }
    public String ExecuteNonQueryCommandWithOUTPUT(List<GenericModel> parameters, string procName)
    {
        var OutPut = string.Empty;
        try
        {
            using (var con = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(procName, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    foreach (GenericModel param in parameters)
                    {
                        cmd.Parameters.AddWithValue("@" + param.Name, param.Value);
                    }
                    cmd.Parameters.Add("@OUTPUT", SqlDbType.VarChar, 200);
                    cmd.Parameters["@OUTPUT"].Direction = ParameterDirection.Output;
                    con.Open();
                    cmd.ExecuteNonQuery();
                    OutPut = cmd.Parameters["@OUTPUT"].Value.ToString();
                    con.Close();
                }
            }
        }
        catch (Exception ex)
        {
            OutPut = ex.Message;
        }
        return OutPut;
    }

    public DataTable GetDataTable(List<GenericModel> parameters, string procName)
    {
        DataTable dt;
        using (var con = new SqlConnection(ConnectionString))
        {
            using (SqlCommand cmd = new SqlCommand(procName, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                foreach (GenericModel param in parameters)
                {
                    cmd.Parameters.AddWithValue("@" + param.Name, param.Value);
                }
                con.Open();
                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    dt = new DataTable();
                    dt.Load(dr);
                }
            }
        }
        return dt;
    }
}
