using Domain.Properties;

namespace Domain.Exceptions
{
    public class UserAlreadyExistsException : DomainException
    {
        public UserAlreadyExistsException(string login) : base(string.Format(Resource.ExceptionUserAlreadyExists, login)) 
        {
        }
    }
}
