using MediatR;

namespace SchoolMoney.Commands
{
    public class DeleteFundraiserCommand : IRequest<Unit>
    {
        public int FundraiserId { get; set; }
    }
}
