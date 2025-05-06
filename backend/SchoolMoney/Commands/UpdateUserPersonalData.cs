using MediatR;

namespace SchoolMoney.Commands
{
    public class UpdateUserPersonalData : IRequest<Unit>
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
    }
}
