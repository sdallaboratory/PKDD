using XTool.Models.UserManager;

namespace XTool.Models.Shared
{
    public class OperationResult
    {
        public Statuses Status { get; set; }

        public string Message { get; set; }

        public int RelatedId { get; set; } = -1;
    }
}
