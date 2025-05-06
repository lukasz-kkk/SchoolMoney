using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class UpdateUserPersonalDataRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
    }
}
