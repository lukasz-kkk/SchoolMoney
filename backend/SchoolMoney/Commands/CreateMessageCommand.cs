using MediatR;

namespace SchoolMoney.Commands
{
    public class CreateMessageCommand : IRequest<Unit>
    {
        public int ReceiverGroupId { get; set; }
        public int ReceiverUserId { get; set; }
        public string Content { get; set; }
    }
}
