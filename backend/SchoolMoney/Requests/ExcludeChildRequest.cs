using FluentValidation;

namespace SchoolMoney.Requests
{
    public class ExcludeChildRequest
    {
        public int ChildId { get; set; }
    }

    public class ExcludeChildRequestValidator : AbstractValidator<ExcludeChildRequest>
    {
        public ExcludeChildRequestValidator()
        {
            RuleFor(x => x.ChildId).NotEmpty();
        }
    }
}
