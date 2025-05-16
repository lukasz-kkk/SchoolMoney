namespace SchoolMoney.Response
{
    public class UserChatResponse
    {
        public int UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public DateTime LastMessageSent { get; set; }
    }
}