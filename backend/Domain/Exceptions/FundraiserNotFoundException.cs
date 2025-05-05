using Domain.Properties;

namespace Domain.Exceptions
{
    public class FundraiserNotFoundException : DomainException
    {
        public FundraiserNotFoundException(int fundraiserId) : base(string.Format(Resource.ExceptionFundraiserNotFound, fundraiserId)) 
        {
        }
    }
}
