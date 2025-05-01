using SchoolMoney.Response;
using MediatR;

namespace SchoolMoney.Queries
{
    public class GetFundraisersByGroupQuery : IRequest<IEnumerable<FundraiserResponse>>
    {
        public int Id { get; set; }
    }
}
