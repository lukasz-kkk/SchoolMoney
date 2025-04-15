namespace SchoolMoney.Response
{
    public class ThreadResponse
    {
        public int Id { get; set; }
        public int ReceiverId { get; set; }
        public bool IsRead { get; set; }
        public string Subject { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}