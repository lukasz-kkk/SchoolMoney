using MediatR;

namespace SchoolMoney.Commands
{
    public class UnrollChildFromGroupCommand : IRequest<Unit>
    {
        public int ChildId { get; set; }
        public int GroupId { get; set; }
    }
}
