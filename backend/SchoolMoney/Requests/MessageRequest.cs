namespace SchoolMoney.Requests
{
    public class MessageRequest
    {
        public int ReceiverClassId { get; set; }
        public int ReceiverUserId { get; set; }
        public string Content { get; set; }
    }
}