using SchoolMoney.Response;
using MediatR;

namespace SchoolMoney.Commands
{
    public class RegisterCommand : IRequest<UserResponse>
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public DateOnly DateOfBirth { get; set; }
    }
}
