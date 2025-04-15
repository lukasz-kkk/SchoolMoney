using Domain.Properties;

namespace Domain.Exceptions
{
    public class PasswordNotMatchException : DomainException
    {
        public PasswordNotMatchException(string login) : base(string.Format(Resource.ExceptionUserPasswordNotMatch, login)) 
        {
        }
    }
}
