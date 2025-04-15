using SchoolMoney.Properties;

namespace SchoolMoney.Exceptions
{
    public class InvalidCookieException : Exception
    {
        public InvalidCookieException(string cookieName) : base(string.Format(Resource.ExceptionCookieIsInvalid, cookieName))
        {
        }
    }
}
