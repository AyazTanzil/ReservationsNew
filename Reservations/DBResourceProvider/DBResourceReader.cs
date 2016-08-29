using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Resources;

namespace DBResourceProvider
{
    /// <summary>
    /// Implementation of IResourceReader required to retrieve a dictionary of resource values for
    /// implicit localization.
    /// </summary>
    public class DBResourceReader : DisposableBaseType, IResourceReader, IEnumerable<KeyValuePair<string, object>>
    {
        private ListDictionary m_resourceDictionary;

        public DBResourceReader(ListDictionary resourceDictionary)
        {
            Debug.WriteLine("DBResourceReader()");

            this.m_resourceDictionary = resourceDictionary;
        }

        protected override void Cleanup()
        {
            try
            {
                this.m_resourceDictionary = null;
            }
            finally
            {
                base.Cleanup();
            }
        }

        #region IResourceReader Members

        public void Close()
        {
            this.Dispose();
        }

        public IDictionaryEnumerator GetEnumerator()
        {
            Debug.WriteLine("DBResourceReader.GetEnumerator()");

            // NOTE: this is the only enumerator called by the runtime for implicit expressions

            if (Disposed)
            {
                throw new ObjectDisposedException("DBResourceReader object is already disposed.");
            }

            return this.m_resourceDictionary.GetEnumerator();
        }

        #endregion IResourceReader Members

        #region IEnumerable Members

        IEnumerator IEnumerable.GetEnumerator()
        {
            if (Disposed)
            {
                throw new ObjectDisposedException("DBResourceReader object is already disposed.");
            }

            return this.m_resourceDictionary.GetEnumerator();
        }

        #endregion IEnumerable Members

        #region IEnumerable<KeyValuePair<string,object>> Members

        IEnumerator<KeyValuePair<string, object>> IEnumerable<KeyValuePair<string, object>>.GetEnumerator()
        {
            if (Disposed)
            {
                throw new ObjectDisposedException("DBResourceReader object is already disposed.");
            }

            return this.m_resourceDictionary.GetEnumerator() as IEnumerator<KeyValuePair<string, object>>;
        }

        #endregion IEnumerable<KeyValuePair<string,object>> Members
    }
}