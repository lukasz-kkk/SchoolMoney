using MediatR;

namespace SchoolMoney.Commands
{
    public class RefreshGroupJoinCodeCommand : IRequest<Unit>
    {
        public int GroupId { get; set; }
    }
}
