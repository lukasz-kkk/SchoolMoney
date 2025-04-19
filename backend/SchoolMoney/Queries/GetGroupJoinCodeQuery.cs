using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetGroupJoinCodeQuery : IRequest<GroupJoinCodeResponse>
    {
        public int GroupId { get; set; }
    }
}
