using SchoolMoney.Properties;

namespace SchoolMoney.Exceptions
{
    public class MissingSigningKeyException : Exception
    {
        public MissingSigningKeyException() : base(Resource.ExceptionSigningKeyIsMissing)
        {
        }
    }
}
