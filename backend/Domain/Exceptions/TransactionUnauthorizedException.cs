using Domain.Properties;

namespace Domain.Exceptions
{
    public class TransactionUnauthorizedException : DomainException
    {
        public TransactionUnauthorizedException() : base(Resource.ExceptionTransactionUnauthorized)
        {
        }
    }
}
