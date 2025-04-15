using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class LoginRequest
    {
        public string login { get; set; }
        public string Password { get; set; }
    }

    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(loginRequest => loginRequest.login)
                .NotEmpty().WithMessage(Resource.ValidatorloginRequired)
                .MinimumLength(5).WithMessage(Resource.ValidatorloginLonger)
                .MaximumLength(20).WithMessage(Resource.ValidatorloginShorter);

            RuleFor(loginRequest => loginRequest.Password)
                .NotEmpty().WithMessage(Resource.ValidatorPasswordRequired)
                .MinimumLength(5).WithMessage(Resource.ValidatorPasswordLonger)
                .MaximumLength(255).WithMessage(Resource.ValidatorPasswordShorter);
        }
    }
}