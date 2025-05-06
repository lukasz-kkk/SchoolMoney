using MediatR;
using SchoolMoney.Response;
namespace SchoolMoney.Queries
{
    public class GetFundraiserRaport : IRequest<string>
    {
        public int FundraiserId { get; set; }
    }
}
