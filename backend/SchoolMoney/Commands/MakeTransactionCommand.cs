using MediatR;

namespace SchoolMoney.Commands
{
    public class MakeTransactionCommand : IRequest<Unit>
    {
        public string Name { get; set; }
        public string SourceAccountNumber { get; set; }
        public string TargetAccountNumber { get; set; }
        public decimal Amount { get; set; }
    }
}
