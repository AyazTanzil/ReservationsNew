using Newtonsoft.Json;
using Reservations.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Reservations.App_Code
{
    public class DataBaseManager
    {
        protected static string ConnectionString
        {
            get
            {
                ConnectionStringSettings s = ConfigurationManager.ConnectionStrings["connectionString"];
                return s.ConnectionString;
            }
        }
        public String ExecuteQueryCommand(GenericModel[] parameters, string procName)
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
            return JsonConvert.SerializeObject(dt);
        }
        public String ExecuteNonQueryCommand(GenericModel[] parameters, string procName, string conStr)
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
        public String ExecuteNonQueryCommandWithOUTPUT(GenericModel[] parameters, string procName, string conStr)
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

        public DataTable GetDataTable(GenericModel[] parameters, string procName)
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

}