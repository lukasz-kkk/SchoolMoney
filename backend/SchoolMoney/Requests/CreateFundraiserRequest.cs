using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class CreateFundraiserRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal AmountPerPerson { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int GroupId { get; set; }
    }

    public class CreateFundraiserRequestValidator : AbstractValidator<CreateFundraiserRequest>
    {
        public CreateFundraiserRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage(Resource.ValidatorFundraiserNameRequired);

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage(Resource.ValidatorFundraiserDescriptionRequired);

            RuleFor(x => x.StartDate)
                .NotEmpty().WithMessage(Resource.ValidatorFundraiserStartDateRequired);

            RuleFor(x => x.EndDate)
                .NotEmpty().WithMessage(Resource.ValidatorFundraiserEndDateRequired);

            RuleFor(x => x.EndDate)
                .GreaterThan(x => x.StartDate).WithMessage(Resource.ValidatorFundraiserEndDateGreaterThenStartDate);

            RuleFor(x => x.AmountPerPerson)
                .NotEmpty().WithMessage(Resource.ValidatorFundaiserGoalMustBeSpecified)
                .GreaterThan(0).WithMessage(Resource.ValidatorFundaiserGoalMustBeSpecified);

            RuleFor(x => x.GroupId)
                .NotEmpty().WithMessage(Resource.ValidatorFundraiserGroupIdRequired);
        }
    }
}
