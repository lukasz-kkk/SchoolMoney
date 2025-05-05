using SchoolMoney.Response;
using MediatR;

namespace SchoolMoney.Queries
{
    public class GetFundraiserChildsQuery : IRequest<FundraiserChildsResponse>
    {
        public int Id { get; set; }
    }
}
