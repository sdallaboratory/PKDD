using XTool.Models.UserManager;

namespace XTool.Models.Shared
{
    public class OperationResult
    {
        public OperationResult()
        { }

        public OperationResult(Statuses status, string message = null, object data = null)
        {
            Status = status;
            Message = message;
            Data = data;
        }

        public Statuses Status { get; set; }

        public string Message { get; set; }

        public object Data { get; set; }

        public static OperationResult UnknownError =>
            new OperationResult() { Status = Statuses.Error, Message = "При попытке выполнить действие произошла неизвестная ошибка!" };
    }
}
