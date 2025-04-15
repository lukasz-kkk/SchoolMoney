using SchoolMoney.Response;
using MediatR;

namespace SchoolMoney.Queries
{
    public class LoginQuery : IRequest<UserResponse>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
