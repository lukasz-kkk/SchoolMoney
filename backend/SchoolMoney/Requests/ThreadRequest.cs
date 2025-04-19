using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class ThreadRequest
    {
        public int ParentId { get; set; }
        public int TreasurerId { get; set; }
        public string Subject { get; set; }
    }

    public class ThreadRequestValidator : AbstractValidator<ThreadRequest>
    {
        public ThreadRequestValidator()
        {
            RuleFor(threadRequest => threadRequest.Subject)
                .NotEmpty().WithMessage(Resource.ValidatorSubjectRequired)
                .MinimumLength(3).WithMessage(Resource.ValidatorSubjectLonger)
                .MaximumLength(255).WithMessage(Resource.ValidatorSubjectShorter);
        }
    }
}