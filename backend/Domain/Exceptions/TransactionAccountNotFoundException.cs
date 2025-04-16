using Domain.Properties;

namespace Domain.Exceptions
{
    public class TransactionAccountNotFoundException : DomainException
    {
        public TransactionAccountNotFoundException(string accountNumber)
            : base(string.Format(Resource.ExceptionTransactionAccountNotFound, accountNumber))
        {
        }
    }
}
