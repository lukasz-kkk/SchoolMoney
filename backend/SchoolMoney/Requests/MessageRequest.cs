namespace SchoolMoney.Requests
{
    public class MessageRequest
    {
        // Sender ID nie jest tutaj potrzebny, weźmiemy go z cookiesów
        public int ReceiverClassId { get; set; }
        public int ReceiverUserId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}