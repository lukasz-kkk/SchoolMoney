using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class UpdateGroupNameRequest
    {
        public string NewName { get; set; }
    }

    public class UpdateGroupNameRequestValidator : AbstractValidator<UpdateGroupNameRequest>
    {
        public UpdateGroupNameRequestValidator()
        {
            RuleFor(updateGroupNameRequest => updateGroupNameRequest.NewName)
                .NotEmpty().WithMessage(Resource.ValidatorGroupNameRequired)
                .MinimumLength(3).WithMessage(Resource.ValidatorGroupNameLonger)
                .MaximumLength(255).WithMessage(Resource.ValidatorGroupNameShorter);
        }
    }
}