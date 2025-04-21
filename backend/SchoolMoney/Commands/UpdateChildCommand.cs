using MediatR;

namespace SchoolMoney.Commands
{
    public class UpdateChildCommand : IRequest<Unit>
    {
        public int ChildId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
    }
}
