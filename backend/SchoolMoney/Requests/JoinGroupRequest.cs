using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class JoinGroupRequest
    {
        public string JoinCode { get; set; }
        public int ChildId { get; set; }
    }

    public class JoinGroupRequestValidator : AbstractValidator<JoinGroupRequest>
    {
        public JoinGroupRequestValidator()
        {
            RuleFor(groupRequest => groupRequest.JoinCode)
                .NotEmpty().WithMessage(Resource.ValidatorJoinCodeRequired)
                .Length(7).WithMessage(Resource.ValidatorJoinCodeLength);
        }
    }
}