using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using XTool.Models.UserManager;

namespace XTool.Models.Shared
{
    public class OperationResultException : Exception
    {
        public OperationResult OperationResult { get; set; }

        public OperationResultException(OperationResult operationResult) : base(operationResult.Message)
        {
            OperationResult = operationResult ?? throw new ArgumentNullException();
        }

        public OperationResultException(Statuses status, string message = null, object data = null) : this ( new OperationResult() { Status = status, Message = message, Data = data })
        { }
    }
}
