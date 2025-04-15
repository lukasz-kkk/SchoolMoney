using SchoolMoney.Response;
using MediatR;

namespace SchoolMoney.Queries
{
    public class GetAllGroupsQuery : IRequest<IEnumerable<GroupResponse>>
    {
    }
}
