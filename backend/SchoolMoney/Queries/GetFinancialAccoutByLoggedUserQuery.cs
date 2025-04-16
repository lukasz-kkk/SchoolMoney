using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetFinancialAccoutByLoggedUserQuery : IRequest<FinancialAccountResponse>
    {
    }
}