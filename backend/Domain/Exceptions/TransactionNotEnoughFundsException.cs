using Domain.Properties;


namespace Domain.Exceptions
{
    public class TransactionNotEnoughFundsException : Exception
    {
        public TransactionNotEnoughFundsException() : base(Resource.ExceptionTransactionNotEnoughFunds)
        {
        }
    }
}