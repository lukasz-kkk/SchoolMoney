using MediatR;
using SchoolMoney.Response;

namespace SchoolMoney.Queries
{
    public class GetTransactionsHistoryQuery : IRequest<IEnumerable<TransactionResponse>>
    {
        public string AccountNumber { get; set; }
    }
}