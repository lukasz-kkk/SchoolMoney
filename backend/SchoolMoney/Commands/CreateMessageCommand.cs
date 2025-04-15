using MediatR;

namespace SchoolMoney.Commands
{
    public class CreateMessageCommand : IRequest<Unit>
    {
        public int ThreadId { get; set; }
        public string Content { get; set; }
    }
}
