using MediatR;

namespace SchoolMoney.Commands
{
    public class DeleteChildCommand : IRequest<Unit>
    {
        public int ChildId { get; set; }
    }
}
