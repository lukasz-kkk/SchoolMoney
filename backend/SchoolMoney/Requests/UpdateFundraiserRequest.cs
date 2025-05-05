using FluentValidation;
using SchoolMoney.Properties;

namespace SchoolMoney.Requests
{
    public class UpdateFundraiserRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
    }

    public class UpdateFundraiserRequestValidator : AbstractValidator<UpdateFundraiserRequest>
    {
        public UpdateFundraiserRequestValidator()
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
        }
    }
}
