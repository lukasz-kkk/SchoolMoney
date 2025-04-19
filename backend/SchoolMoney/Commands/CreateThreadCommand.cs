using MediatR;

namespace SchoolMoney.Commands
{
    public class CreateThreadCommand : IRequest<Unit>
    {
        public int ParentId { get; set; }
        public int TreasurerId { get; set; }
        public string Subject { get; set; }
    }
}
