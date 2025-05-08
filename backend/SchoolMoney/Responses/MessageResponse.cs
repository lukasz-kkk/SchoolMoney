namespace SchoolMoney.Response
{
    public class MessageResponse
    {
        public int MessageId { get; set; }
        public int SenderId { get; set; }
        public string SenderFirstName { get; set; }
        public string SenderLastName { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}