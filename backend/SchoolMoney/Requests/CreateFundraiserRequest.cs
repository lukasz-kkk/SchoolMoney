using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class CreateFundraiserRequest : UpdateFundraiserRequest
    {
        public decimal AmountPerPerson { get; set; }
        public int GroupId { get; set; }
    }

    public class CreateFundraiserRequestValidator : AbstractValidator<CreateFundraiserRequest>
    {
        public CreateFundraiserRequestValidator()
        {
            Include(new UpdateFundraiserRequestValidator());
            RuleFor(x => x.AmountPerPerson)
                .NotEmpty().WithMessage(Resource.ValidatorFundaiserGoalMustBeSpecified)
                .GreaterThan(0).WithMessage(Resource.ValidatorFundaiserGoalMustBeSpecified);

            RuleFor(x => x.GroupId)
                .NotEmpty().WithMessage(Resource.ValidatorFundraiserGroupIdRequired);
        }
    }
}
