using System;
using System.Data;
using System.Data.SqlClient;

namespace DBResourceProvider
{
    public enum DataBasesStatus { ServerNotFound, DBNotFound, DBFound }

    /// <summary>
    /// Base services for the launcher DB
    /// </summary>
    public partial class SystemStringBaseServices
    {
        private string _connectionString;

        public SystemStringBaseServices(string cnn)
        {
            _connectionString = cnn;
        }

        //-----------------------------------------------------------------------------------------------------

        #region Launcher DB Executions

        protected object ExecuteScalarCommand(string procName, params IDataParameter[] procParams)
        {
            SqlConnection cnx = null;
            object obj = null;
            SqlDataAdapter da = new SqlDataAdapter();
            SqlCommand cmd = null;
            try
            {
                cmd = new SqlCommand(procName);
                cmd.CommandType = CommandType.StoredProcedure;

                if (procParams != null)
                    for (int index = 0; index < procParams.Length; index++)
                        cmd.Parameters.Add(procParams[index]);

                da.SelectCommand = (SqlCommand)cmd;

                cnx = new SqlConnection(_connectionString);
                cmd.Connection = cnx;
                cnx.Open();

                obj = cmd.ExecuteScalar();
            }
            catch (Exception exc)
            {
                throw exc;
            }
            finally
            {
                if (da != null)
                    da.Dispose();

                if (cmd != null)
                    cmd.Dispose();

                cnx.Dispose();
            }
            return obj;
        }

        protected DataSet ExecuteQueryCommand(string procName, params IDataParameter[] procParams)
        {
            SqlConnection cnx = null;
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter();
            SqlCommand cmd = null;
            try
            {
                cmd = new SqlCommand(procName);
                cmd.CommandType = CommandType.StoredProcedure;
                if (procParams != null)
                    for (int index = 0; index < procParams.Length; index++)
                        cmd.Parameters.Add(procParams[index]);

                da.SelectCommand = (SqlCommand)cmd;

                cnx = new SqlConnection(_connectionString);
                cmd.Connection = cnx;
                cnx.Open();

                //Fill the dataset
                da.Fill(ds);
            }
            catch (Exception exc)
            {
                throw exc;
            }
            finally
            {
                if (da != null)
                    da.Dispose();

                if (cmd != null)
                    cmd.Dispose();

                cnx.Dispose();
            }
            return ds;
        }

        protected int ExecuteNonQueryCommand(string procName, params IDataParameter[] procParams)
        {
            SqlConnection cnx = null;
            SqlCommand cmd = null;
            try
            {
                cmd = new SqlCommand(procName);
                cmd.CommandType = CommandType.StoredProcedure;

                for (int index = 0; index < procParams.Length; index++)
                    cmd.Parameters.Add(procParams[index]);

                cnx = new SqlConnection(_connectionString);
                cmd.Connection = cnx;
                cnx.Open();

                return cmd.ExecuteNonQuery();
            }
            catch (Exception exc)
            {
                throw exc;
            }
            finally
            {
                cnx.Dispose();

                if (cmd != null)
                    cmd.Dispose();
            }
        }

        protected int ExecuteNonQueryAdhocSQL(string sql)
        {
            SqlConnection cnx = null;
            SqlCommand cmd = null;
            try
            {
                cmd = new SqlCommand(sql);
                cmd.CommandType = CommandType.Text;

                cnx = new SqlConnection(_connectionString);
                cmd.Connection = cnx;
                cnx.Open();

                return cmd.ExecuteNonQuery();
            }
            catch
            {
                throw;
            }
            finally
            {
                cnx.Dispose();

                if (cmd != null)
                    cmd.Dispose();
            }
        }

        #endregion Launcher DB Executions

        #region Create Parameters

        protected static SqlParameter CreateParameter(string paramName, SqlDbType paramType, object paramValue)
        {
            SqlParameter param = new SqlParameter(paramName, paramType);
            param.Value = paramValue;
            return param;
        }

        protected static SqlParameter CreateParameter(string paramName, SqlDbType paramType, object paramValue, int size)
        {
            SqlParameter param = CreateParameter(paramName, paramType, paramValue);
            param.Size = size;
            return param;
        }

        protected static SqlParameter CreateParameter(string paramName, SqlDbType paramType, object paramValue, ParameterDirection direction)
        {
            SqlParameter param = CreateParameter(paramName, paramType, paramValue);
            param.Direction = direction;
            return param;
        }

        protected static SqlParameter CreateParameter(string paramName, SqlDbType paramType, object paramValue, int size, ParameterDirection direction)
        {
            SqlParameter param = CreateParameter(paramName, paramType, paramValue, size);
            param.Direction = direction;
            return param;
        }

        #endregion Create Parameters

        #region Business Stuff

        protected static int GetInt(DataRow row, string columnName)
        {
            return (row[columnName] != DBNull.Value) ? Convert.ToInt32(row[columnName]) : NullInt;
        }

        protected static DateTime GetDateTime(DataRow row, string columnName)
        {
            return (row[columnName] != DBNull.Value) ? Convert.ToDateTime(row[columnName]) : NullDateTime;
        }

        protected static Decimal GetDecimal(DataRow row, string columnName)
        {
            return (row[columnName] != DBNull.Value) ? Convert.ToDecimal(row[columnName]) : NullDecimal;
        }

        protected static bool GetBool(DataRow row, string columnName)
        {
            return (row[columnName] != DBNull.Value) ? Convert.ToBoolean(row[columnName]) : false;
        }

        protected static string GetString(DataRow row, string columnName)
        {
            return (row[columnName] != DBNull.Value) ? Convert.ToString(row[columnName]) : NullString;
        }

        protected static Byte[] GetImage(DataRow row, string columnName)
        {
            return (row[columnName] != DBNull.Value) ? (Byte[])row[columnName] : NullBytes;
        }

        protected static double GetDouble(DataRow row, string columnName)
        {
            return (row[columnName] != DBNull.Value) ? Convert.ToDouble(row[columnName]) : NullDouble;
        }

        protected static float GetFloat(DataRow row, string columnName)
        {
            return (row[columnName] != DBNull.Value) ? Convert.ToSingle(row[columnName]) : NullFloat;
        }

        protected static Guid GetGuid(DataRow row, string columnName)
        {
            return (row[columnName] != DBNull.Value) ? (Guid)(row[columnName]) : NullGuid;
        }

        protected static long GetLong(DataRow row, string columnName)
        {
            return (row[columnName] != DBNull.Value) ? (long)(row[columnName]) : NullLong;
        }

        public static DateTime NullDateTime = DateTime.MinValue;
        public static decimal NullDecimal = decimal.MinValue;
        public static double NullDouble = double.MinValue;
        public static Guid NullGuid = Guid.Empty;
        public static int NullInt = int.MinValue;
        public static long NullLong = long.MinValue;
        public static float NullFloat = float.MinValue;
        public static string NullString = string.Empty;
        public static Byte[] NullBytes = new Byte[] { };
        public static DateTime SqlMaxDate = new DateTime(9999, 1, 3, 23, 59, 59);
        public static DateTime SqlMinDate = new DateTime(1753, 1, 1, 00, 00, 00);

        #endregion Business Stuff
    }
}