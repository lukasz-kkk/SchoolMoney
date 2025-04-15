using SchoolMoney.Response;
using MediatR;

namespace SchoolMoney.Queries
{
    public class GetUsersByRoleQuery : IRequest<IEnumerable<UserResponse>>
    {
        public string UserRole { get; set; }
    }
}
