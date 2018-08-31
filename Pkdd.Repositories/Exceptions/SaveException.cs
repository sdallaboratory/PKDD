using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Pkdd.Repositories.Exceptions
{
    public class SaveException : Exception
    {
        public SaveException()
        {
        }

        public SaveException(string message) : base(message)
        {
        }

        public SaveException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected SaveException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
