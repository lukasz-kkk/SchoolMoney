using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetThreadByLoggedUserQuery : IRequest<IEnumerable<ThreadResponse>>
    {
    }
}