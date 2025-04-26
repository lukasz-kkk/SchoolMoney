using MediatR;

namespace SchoolMoney.Commands
{
    public class ExcludeChildCommand : IRequest<Unit>
    {
        public int ChildId { get; set; }
        public int FundraiserId { get; set; }
    }
}
