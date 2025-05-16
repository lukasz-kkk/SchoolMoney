using Domain;

namespace SchoolMoney.Response
{
    public class ChatListResponse
    {
        public List<GroupChatResponse> GroupChatList { get; set; }
        public List<UserChatResponse> UserChatList { get; set; }
    }
}