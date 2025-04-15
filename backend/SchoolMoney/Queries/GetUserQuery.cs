using SchoolMoney.Response;
using MediatR;

namespace SchoolMoney.Queries
{
    public class GetUserQuery : IRequest<UserResponse>
    {
        public int UserId { get; set; }
    }
}
