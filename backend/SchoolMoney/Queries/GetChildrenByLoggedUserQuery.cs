using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetChildrenByLoggedUserQuery : IRequest<IEnumerable<ChildResponse>>
    {
    }
}