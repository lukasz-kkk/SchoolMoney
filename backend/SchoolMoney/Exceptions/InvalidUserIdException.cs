using SchoolMoney.Properties;

namespace SchoolMoney.Exceptions
{
    public class InvalidUserIdException : Exception
    {
        public InvalidUserIdException() : base(Resource.ExceptionUserIdIsInvalid)
        {
        }
    }
}
