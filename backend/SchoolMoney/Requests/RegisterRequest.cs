using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class RegisterRequest
    {
        public string login { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public DateOnly DateOfBirth { get; set; }
    }

    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(registerRequest => registerRequest.login)
                .NotEmpty().WithMessage(Resource.ValidatorloginRequired)
                .MinimumLength(5).WithMessage(Resource.ValidatorloginLonger)
                .MaximumLength(20).WithMessage(Resource.ValidatorloginShorter);

            RuleFor(registerRequest => registerRequest.FirstName)
                .NotEmpty().WithMessage(Resource.ValidatorFirstNameRequired)
                .MaximumLength(20).WithMessage(Resource.ValidatorFirstNameShorter);

            RuleFor(registerRequest => registerRequest.LastName)
                .NotEmpty().WithMessage(Resource.ValidatorLastNameRequired)
                .MaximumLength(20).WithMessage(Resource.ValidatorLastNameShorter);

            RuleFor(registerRequest => registerRequest.Password)
                .NotEmpty().WithMessage(Resource.ValidatorPasswordRequired)
                .MinimumLength(5).WithMessage(Resource.ValidatorPasswordLonger)
                .MaximumLength(255).WithMessage(Resource.ValidatorPasswordShorter);
        }
    }
}