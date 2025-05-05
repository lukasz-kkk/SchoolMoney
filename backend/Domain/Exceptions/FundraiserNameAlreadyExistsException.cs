using Domain.Properties;

namespace Domain.Exceptions
{
    public class FundraiserNameAlreadyExistsException : DomainException
    {
        public FundraiserNameAlreadyExistsException(string name) : base(string.Format(Resource.FundraiserNameAlreadyExists, name))
        {
        }
    }
}
