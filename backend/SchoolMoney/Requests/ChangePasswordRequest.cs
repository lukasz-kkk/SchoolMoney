using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class ChangePasswordRequest
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }

    public class ChangePasswordRequestValidator : AbstractValidator<ChangePasswordRequest>
    {
        public ChangePasswordRequestValidator()
        {
            RuleFor(registerRequest => registerRequest.OldPassword)
                .NotEmpty().WithMessage(Resource.ValidatorPasswordRequired)
                .MinimumLength(5).WithMessage(Resource.ValidatorPasswordLonger)
                .MaximumLength(255).WithMessage(Resource.ValidatorPasswordShorter);

            RuleFor(registerRequest => registerRequest.NewPassword)
                .NotEmpty().WithMessage(Resource.ValidatorPasswordRequired)
                .MinimumLength(5).WithMessage(Resource.ValidatorPasswordLonger)
                .MaximumLength(255).WithMessage(Resource.ValidatorPasswordShorter);
        }
    }
}
