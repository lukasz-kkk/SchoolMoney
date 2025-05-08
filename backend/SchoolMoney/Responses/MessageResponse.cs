namespace SchoolMoney.Response
{
    public class MessageResponse
    {
        public int SenderUserId { get; set; }
        public string SenderFirstName { get; set; }
        public string SenderLastName { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}