using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetGroupByLoggedUserQuery : IRequest<IEnumerable<GroupResponse>>
    {
    }
}