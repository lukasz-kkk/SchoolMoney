using MediatR;

namespace SchoolMoney.Commands
{
    public class UpdateThreadLastReadCommand : IRequest<Unit>
    {
        public int ThreadId { get; set; }
    }
}