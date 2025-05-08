using MediatR;
using SchoolMoney.Response;
namespace SchoolMoney.Queries
{
    public class GetMessagesByReceiverQuery : IRequest<IEnumerable<MessageResponse>>
    {
        public int ReceiverGroupId { get; set; }
        public int ReceiverUserId { get; set; }
    }
}
