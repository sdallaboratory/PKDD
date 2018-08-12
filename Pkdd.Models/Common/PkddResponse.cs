using System;

namespace Pkdd.Models.Common
{
    /// <summary>
    /// Serves as data-transfer entity and is used for sending any response from API controllers.
    /// </summary>
    public class PkddResponse
    {
        public PkddResponse(object data = null, string type = null, bool isOk = true, string message = null)
        {
            Data = data;
            Type = type;
            IsOk = isOk;
            Message = message;
        }

        /// <summary>
        /// Main data object to be transfered.
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// Conventional (with frontend) name for sending data object type.
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Result was got without any problems and <see cref="Data"/> contains expected object.
        /// </summary>
        public bool IsOk { get; set; }

        /// <summary>
        /// Cover message for the response.
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Stores the time when response was created
        /// </summary>
        public DateTime TimeStamp { get; } = DateTime.Now;
    }
}
