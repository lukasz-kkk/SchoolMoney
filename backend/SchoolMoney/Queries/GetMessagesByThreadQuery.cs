using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetMessagesByThreadQuery : IRequest<IEnumerable<MessageResponse>>
    {
        public int ThreadId { get; set; }
    }
}