using MediatR;

namespace SchoolMoney.Commands
{
    public class SwitchBlockFundraiserCommand : IRequest<Unit>
    {
        public int FundraiserId { get; set; }
        public bool IsBlocked { get; set; }
    }
}
