using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class GroupRequest
    {
        public string Name { get; set; }
        public int CaregiverId { get; set; }
    }

    public class GroupRequestValidator : AbstractValidator<GroupRequest>
    {
        public GroupRequestValidator()
        {
            RuleFor(groupRequest => groupRequest.Name)
                .NotEmpty().WithMessage(Resource.ValidatorGroupNameRequired)
                .MinimumLength(3).WithMessage(Resource.ValidatorGroupNameLonger)
                .MaximumLength(255).WithMessage(Resource.ValidatorGroupNameShorter);
        }
    }
}