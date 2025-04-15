namespace SchoolMoney.Response
{
    public class MessageResponse
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Content { get; set; }
    }
}