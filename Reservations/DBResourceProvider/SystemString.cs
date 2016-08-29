using System.Data;

namespace DBResourceProvider
{
    public class SystemString
    {
        public int SystemStringID
        { set; get; }

        public int RecordNumber
        { set; get; }

        public string enUS
        { set; get; }

        public string arSA
        { set; get; }

        public string frFR
        { set; get; }

        public override string ToString()
        {
            return "English: " + enUS + "\nArabic: " + arSA + "\nFrench: " + frFR + "\n";
        }
    }

    public class SystemStringBusinessService : SystemStringBaseServices
    {
        public SystemStringBusinessService(string stringsDBConnection)
            : base(stringsDBConnection)
        {
        }

        public SystemString Select(int systemStringId)
        {
            var ds = ExecuteQueryCommand("SystemString_Select",
                CreateParameter("SystemStringId", SqlDbType.Int, systemStringId));
            return ds == null ? null : CreateSystemStringFromDataRow(ds.Tables[0].Rows[0]);
        }

        /// <summary>
        /// Used inside the DBResourceProvider
        /// </summary>
        /// <param name="culture"></param>
        /// <param name="ID"></param>
        /// <returns></returns>
        public string SelectSystemStringByStringID(string culture, int ID)
        {
            DataRow dr = null;
            DataSet ds = ExecuteQueryCommand("SystemString_SelectByStringID",
                CreateParameter("CultureCode", SqlDbType.VarChar, culture),
                CreateParameter("StringID", SqlDbType.Int, ID));

            if (ds != null)
            {
                if (ds.Tables.Count > 0)
                    if (ds.Tables[0].Rows.Count > 0)
                        dr = ds.Tables[0].Rows[0];
            }

            if (dr == null)
                return ID.ToString();
            return (string)dr["value"];
        }

        public DataTable SelectAll()
        {
            DataSet ds = ExecuteQueryCommand("SystemString_SelectAll", CreateParameter("Where", SqlDbType.VarChar, ""));

            if (ds != null)
                return ds.Tables[0];

            return null;
        }

        public bool UpdateSystemString(SystemString str)
        {
            if (str == null) return false;
            int rowsAffected = ExecuteNonQueryCommand("SystemString_UpdateSystemString",
            CreateParameter("RecordNumber", SqlDbType.Int, str.RecordNumber),
            CreateParameter("SystemStringID", SqlDbType.Int, str.SystemStringID),
            CreateParameter("enUS", SqlDbType.VarChar, str.enUS),
            CreateParameter("arSA", SqlDbType.VarChar, str.arSA),
            CreateParameter("frFR", SqlDbType.VarChar, str.frFR));
            return (rowsAffected > 0);
        }

        public SystemString CreateSystemStringFromDataRow(DataRow dr)
        {
            if (dr == null) return null;

            var s = new SystemString
            {
                SystemStringID = GetInt(dr, "SystemStringID"),
                RecordNumber = GetInt(dr, "RecordNumber"),
                enUS = GetString(dr, "en-US"),
                arSA = GetString(dr, "ar-SA"),
                frFR = GetString(dr, "fr-FR")
            };
            return s;
        }
    }
}