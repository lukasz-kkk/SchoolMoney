using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserIsNotTreasurerException : DomainException
    {
        public UserIsNotTreasurerException(int userId) : base(string.Format(Resource.ExceptionUserIsNotTreasurer, userId))
        {
        }
    }
}
