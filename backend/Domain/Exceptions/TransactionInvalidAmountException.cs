using Domain.Properties;

namespace Domain.Exceptions
{
    public class TransactionInvalidAmountException : DomainException
    {
        public TransactionInvalidAmountException() : base(Resource.ExceptionTransactionInvalidAmount)
        {
        }
    }
}
