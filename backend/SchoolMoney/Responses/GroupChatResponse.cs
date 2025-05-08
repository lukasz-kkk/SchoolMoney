namespace SchoolMoney.Response
{
    public class GroupChatResponse
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public DateTime LastMessageSent { get; set; }
    }
}