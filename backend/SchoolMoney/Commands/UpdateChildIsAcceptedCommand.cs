using MediatR;

namespace SchoolMoney.Commands
{
    public class UpdateChildIsAcceptedCommand : IRequest<Unit>
    {
        public int ChildId { get; set; }
        public bool NewIsAccepted { get; set; }
    }
}
