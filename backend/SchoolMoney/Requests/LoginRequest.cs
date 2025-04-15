using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(loginRequest => loginRequest.Username)
                .NotEmpty().WithMessage(Resource.ValidatorUsernameRequired)
                .MinimumLength(5).WithMessage(Resource.ValidatorUsernameLonger)
                .MaximumLength(20).WithMessage(Resource.ValidatorUsernameShorter);

            RuleFor(loginRequest => loginRequest.Password)
                .NotEmpty().WithMessage(Resource.ValidatorPasswordRequired)
                .MinimumLength(5).WithMessage(Resource.ValidatorPasswordLonger)
                .MaximumLength(255).WithMessage(Resource.ValidatorPasswordShorter);
        }
    }
}