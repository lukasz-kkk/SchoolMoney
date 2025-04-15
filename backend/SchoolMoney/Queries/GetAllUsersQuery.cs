using SchoolMoney.Response;
using MediatR;

namespace SchoolMoney.Queries
{
    public class GetAllUsersQuery : IRequest<IEnumerable<UserResponse>>
    {
    }
}
