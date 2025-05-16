using Domain;

namespace SchoolMoney.Response
{
    public class PossibleReceiversResponse
    {
        public List<GroupResponse> GroupList { get; set; }
        public List<UserResponse> UserList { get; set; }
    }
}