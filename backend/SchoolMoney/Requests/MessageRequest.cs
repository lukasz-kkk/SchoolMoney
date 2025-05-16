namespace SchoolMoney.Requests
{
    public class MessageRequest
    {
        public int ReceiverGroupId { get; set; }
        public int ReceiverUserId { get; set; }
        public string Content { get; set; }
    }
}