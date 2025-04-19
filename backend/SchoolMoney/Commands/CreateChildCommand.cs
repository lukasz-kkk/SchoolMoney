using MediatR;

namespace SchoolMoney.Commands
{
    public class CreateChildCommand : IRequest<Unit>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
    }
}
