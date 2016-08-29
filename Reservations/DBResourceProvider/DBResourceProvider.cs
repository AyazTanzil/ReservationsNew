using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.Web;
using System.Web.Compilation;

namespace DBResourceProvider
{
    public class CacheClearer
    {
        internal static List<IClearableDBProvider> LoadedProviders = new List<IClearableDBProvider>();

        public static void ClearCache()
        {
            foreach (IClearableDBProvider provider in LoadedProviders)
            {
                provider.ClearResourceCache();
            }
        }
    }

    public class DBResourceProvider : DisposableBaseType, IClearableDBProvider, IResourceProvider
    {
        private SystemStringBusinessService ssbs;
        private string stringsDBConn = System.Configuration.ConfigurationManager.ConnectionStrings["SystemStringsDBCnn"].ConnectionString;

        // resource cache
        private Dictionary<string, Dictionary<string, string>> m_resourceCache = new Dictionary<string, Dictionary<string, string>>();

        /// <summary>
        /// Constructs this instance of the provider supplying a resource type for the instance.
        /// </summary>
        /// <param name="resourceType">The resource type.</param>
        public DBResourceProvider(string page)
        {
            ssbs = new SystemStringBusinessService(stringsDBConn);
            CacheClearer.LoadedProviders.Add(this);
        }

        #region IResourceProvider Members

        /// <summary>
        /// Retrieves a resource entry based on the specified culture and resource key. The resource
        /// type is based on this instance of the DBResourceProvider as passed to the constructor.
        /// To optimize performance, this function caches values in a dictionary per culture.
        /// </summary>
        /// <param name="resourceKey">The resource key to find.</param>
        /// <param name="culture">The culture to search with.</param>
        /// <returns>
        /// If found, the resource string is returned. Otherwise an empty string is returned.
        /// </returns>
        public object GetObject(string resourceKey, CultureInfo culture)
        {
            if (Disposed)
            {
                throw new ObjectDisposedException("DBResourceProvider object is already disposed.");
            }

            if (string.IsNullOrEmpty(resourceKey))
            {
                throw new ArgumentNullException("resourceKey");
            }

            //first read from session
            string sessionCulture = (string)HttpContext.Current.Session["LoggedInCultureCode"];

            if (!(string.IsNullOrEmpty(sessionCulture)))
                culture = new CultureInfo(sessionCulture); // set from session
            else
            {
                string configCulture = System.Configuration.ConfigurationManager.AppSettings["DefaultCulture"];

                if (!string.IsNullOrEmpty(configCulture))
                    culture = new CultureInfo(configCulture);
            }

            // if still not defined than use curentUICulture
            if (culture == null || culture == CultureInfo.InvariantCulture)
            {
                culture = CultureInfo.CurrentUICulture;
            }

            if (resourceKey.Equals("0"))
            {
                return string.Empty;
            }

            string resourceValue = null;
            Dictionary<string, string> resCacheByCulture = null;
            // check the cache first find the dictionary for this culture check for the inner
            // dictionary entry for this key
            if (m_resourceCache.ContainsKey(culture.Name))
            {
                resCacheByCulture = m_resourceCache[culture.Name];
                if (resCacheByCulture.ContainsKey(resourceKey))
                {
                    resourceValue = resCacheByCulture[resourceKey];
                }
            }

            // if not in the cache, go to the database
            if (resourceValue == null)
            {
                string str = ssbs.SelectSystemStringByStringID(culture.Name, int.Parse(resourceKey));

                if (!(string.IsNullOrEmpty(str)))
                    resourceValue = str;
                else
                    resourceValue = resourceKey;

                // add this result to the cache find the dictionary for this culture add this
                // key/value pair to the inner dictionary
                lock (this)
                {
                    if (resCacheByCulture == null)
                    {
                        resCacheByCulture = new Dictionary<string, string>();
                        m_resourceCache.Add(culture.Name, resCacheByCulture);
                    }
                    resCacheByCulture.Add(resourceKey, resourceValue);
                }
            }
            return resourceValue;
        }

        /// <summary>
        /// Returns a resource reader.
        /// </summary>
        public System.Resources.IResourceReader ResourceReader
        {
            get
            {
                if (Disposed)
                {
                    throw new ObjectDisposedException("DBResourceProvider object is already disposed.");
                }

                // this is required for implicit resources this is also used for the expression
                // editor sheet

                ListDictionary resourceDictionary = null;// this.m_dalc.GetResourcesByCulture(CultureInfo.InvariantCulture);

                return new DBResourceReader(resourceDictionary);
            }
        }

        #endregion IResourceProvider Members

        protected override void Cleanup()
        {
            try
            {
                this.m_resourceCache.Clear();
            }
            finally
            {
                base.Cleanup();
            }
        }

        public void ClearResourceCache()
        {
            this.m_resourceCache.Clear();
        }
    }

    public interface IClearableDBProvider
    {
        void ClearResourceCache();
    }
}