using MediatR;

namespace SchoolMoney.Commands
{
    public class UpdateChildGroupCommand : IRequest<Unit>
    {
        public int ChildId { get; set; }
        public int NewGroupId { get; set; }
    }
}