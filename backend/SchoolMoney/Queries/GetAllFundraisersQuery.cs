using SchoolMoney.Response;
using MediatR;

namespace SchoolMoney.Queries
{
    public class GetAllFundraisersQuery : IRequest<IEnumerable<FundraiserResponse>>
    {
    }
}
