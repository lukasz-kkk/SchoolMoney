using MediatR;

namespace SchoolMoney.Commands
{
    public class UpdateGroupNameCommand : IRequest<Unit>
    {
        public int GroupId { get; set; }
        public string NewName { get; set; }
    }
}