using MediatR;

namespace SchoolMoney.Commands
{
    public class CreateRequestToJoinGroupCommand : IRequest<Unit>
    {
        public string JoinCode { get; set; }
        public int ChildId { get; set; }
    }
}
