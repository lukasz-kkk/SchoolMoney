using SchoolMoney.Response;
using MediatR;

namespace SchoolMoney.Queries
{
    public class GetPossibleReceiversQuery : IRequest<PossibleReceiversResponse>
    {
    }
}
